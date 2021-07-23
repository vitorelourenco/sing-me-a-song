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
var genreRepository_1 = __importDefault(require("../repositories/genreRepository"));
var errorWithStatus_1 = __importDefault(require("../utils/errorWithStatus"));
var recommendationService_1 = __importDefault(require("../services/recommendationService"));
function create(body) {
    return __awaiter(this, void 0, void 0, function () {
        var dbNewGenre;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, genreRepository_1["default"].create(body.name)];
                case 1:
                    dbNewGenre = _a.sent();
                    return [2 /*return*/, dbNewGenre === null || dbNewGenre === void 0 ? void 0 : dbNewGenre.rows[0]];
            }
        });
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function () {
        var genres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, genreRepository_1["default"].getAll()];
                case 1:
                    genres = _a.sent();
                    if (!(genres === null || genres === void 0 ? void 0 : genres.rows[0])) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    return [2 /*return*/, genres.rows];
            }
        });
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var dbGenre, genre, allRecommendations, err_1, recommendationsForThisGenre, genreScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, genreRepository_1["default"].getById(id)];
                case 1:
                    dbGenre = _a.sent();
                    genre = dbGenre.rows[0];
                    if (!genre) {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    allRecommendations = [];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, recommendationService_1["default"].getAll()];
                case 3:
                    allRecommendations = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [3 /*break*/, 5];
                case 5:
                    recommendationsForThisGenre = allRecommendations.filter(function (rec) {
                        var _a;
                        var hasThisGenre = false;
                        (_a = rec === null || rec === void 0 ? void 0 : rec.genres) === null || _a === void 0 ? void 0 : _a.forEach(function (genre) {
                            if (genre.id === id) {
                                hasThisGenre = true;
                            }
                        });
                        return hasThisGenre;
                    });
                    genreScore = 0;
                    recommendationsForThisGenre.forEach(function (rec) {
                        genreScore += rec.score;
                    });
                    genre.score = genreScore;
                    genre.recommendations = recommendationsForThisGenre;
                    return [2 /*return*/, genre];
            }
        });
    });
}
exports["default"] = {
    create: create,
    getAll: getAll,
    getById: getById
};
