"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var recommendationRepository_1 = __importDefault(require("../repositories/recommendationRepository"));
var get_youtube_id_1 = __importDefault(require("get-youtube-id"));
var errorWithStatus_1 = __importDefault(require("../utils/errorWithStatus"));
var recommendations_1 = require("../utils/recommendations");
var genreService_1 = __importDefault(require("./genreService"));
function create(body) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!get_youtube_id_1["default"](body.youtubeLink)) {
                        throw new errorWithStatus_1["default"]("smas400");
                    }
                    return [4 /*yield*/, recommendationRepository_1["default"].create(body.name, body.genresIds, body.youtubeLink)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function upvote(id) {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, recommendationRepository_1["default"].upvote(id)];
                case 1:
                    body = _a.sent();
                    if (!(body === null || body === void 0 ? void 0 : body.score) && (body === null || body === void 0 ? void 0 : body.score) !== 0) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    return [2 /*return*/, body];
            }
        });
    });
}
function downvote(id) {
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, recommendationRepository_1["default"].downvote(id)];
                case 1:
                    body = _a.sent();
                    if (!(body === null || body === void 0 ? void 0 : body.score) && (body === null || body === void 0 ? void 0 : body.score) !== 0) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    if (!((body === null || body === void 0 ? void 0 : body.score) < -5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, recommendationRepository_1["default"].remove(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, downvote(id)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/, body];
            }
        });
    });
}
function getRecommendationsWithGenresUsingSubquery(criteria, value) {
    return __awaiter(this, void 0, void 0, function () {
        var subQuery, recommendations, recommendationsWithGenres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    subQuery = recommendations_1.recommendationSubQuery(criteria, value);
                    return [4 /*yield*/, recommendationRepository_1["default"].getRecommendationsWithSubQuery(subQuery)];
                case 1:
                    recommendations = _a.sent();
                    return [4 /*yield*/, recommendations_1.mergeGenresWithRecommendations(recommendations)];
                case 2:
                    recommendationsWithGenres = _a.sent();
                    return [2 /*return*/, recommendationsWithGenres];
            }
        });
    });
}
function getRandomWithScore() {
    return __awaiter(this, void 0, void 0, function () {
        var recommendationsWithGenres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRecommendationsWithGenresUsingSubquery("randomScore")];
                case 1:
                    recommendationsWithGenres = _a.sent();
                    if (!recommendationsWithGenres[0]) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    return [4 /*yield*/, recommendations_1.pickRandomWinner(recommendationsWithGenres)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getTopWithLimit(req) {
    return __awaiter(this, void 0, void 0, function () {
        var amount, orderedRecommendationsWithGenres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    amount = parseInt(req.params.amount);
                    return [4 /*yield*/, getRecommendationsWithGenresUsingSubquery("top", amount)];
                case 1:
                    orderedRecommendationsWithGenres = _a.sent();
                    if (!orderedRecommendationsWithGenres[0]) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    return [2 /*return*/, orderedRecommendationsWithGenres];
            }
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        var all;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRecommendationsWithGenresUsingSubquery("")];
                case 1:
                    all = _a.sent();
                    if (!all[0]) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    return [2 /*return*/, all];
            }
        });
    });
}
function getRandomByGenreId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var genreWithRecommendations, recommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, genreService_1["default"].getById(id)];
                case 1:
                    genreWithRecommendations = _a.sent();
                    if (!genreWithRecommendations || !(genreWithRecommendations === null || genreWithRecommendations === void 0 ? void 0 : genreWithRecommendations.recommendations)) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    recommendations = genreWithRecommendations.recommendations;
                    return [4 /*yield*/, recommendations_1.pickRandomWinner(recommendations)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports["default"] = {
    create: create,
    upvote: upvote,
    downvote: downvote,
    getRandomWithScore: getRandomWithScore,
    getTopWithLimit: getTopWithLimit,
    getAll: getAll,
    getRandomByGenreId: getRandomByGenreId
};
