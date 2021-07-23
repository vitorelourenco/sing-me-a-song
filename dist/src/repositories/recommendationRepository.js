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
var database_1 = __importDefault(require("../database"));
var errorWithStatus_1 = __importDefault(require("../utils/errorWithStatus"));
function create(name, genresIds, youtubeLink) {
    return __awaiter(this, void 0, void 0, function () {
        var genres, _i, genresIds_1, genreId, dbGenre, dbRecommendation, newRecommendation, _a, genresIds_2, genreId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    genres = [];
                    _i = 0, genresIds_1 = genresIds;
                    _b.label = 1;
                case 1:
                    if (!(_i < genresIds_1.length)) return [3 /*break*/, 4];
                    genreId = genresIds_1[_i];
                    return [4 /*yield*/, database_1["default"].query("\n        SELECT *\n        FROM genres\n        WHERE id = $1\n      ", [genreId])];
                case 2:
                    dbGenre = _b.sent();
                    if (dbGenre === null || dbGenre === void 0 ? void 0 : dbGenre.rows[0]) {
                        genres.push(dbGenre.rows[0]);
                    }
                    else {
                        throw new errorWithStatus_1["default"]("smas404");
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, database_1["default"].query("\n    INSERT INTO recommendations\n    (name, \"youtubeLink\")\n    VALUES\n    ($1, $2)\n    RETURNING *\n  ", [name, youtubeLink])];
                case 5:
                    dbRecommendation = _b.sent();
                    newRecommendation = dbRecommendation.rows[0];
                    newRecommendation.genres = genres;
                    _a = 0, genresIds_2 = genresIds;
                    _b.label = 6;
                case 6:
                    if (!(_a < genresIds_2.length)) return [3 /*break*/, 9];
                    genreId = genresIds_2[_a];
                    return [4 /*yield*/, database_1["default"].query("\n      INSERT INTO \"genres_recommendations\"\n      (\"genreId\", \"recommendationId\")\n      VALUES\n      ($1, $2)\n    ", [genreId, newRecommendation.id])];
                case 7:
                    _b.sent();
                    _b.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/, newRecommendation];
            }
        });
    });
}
function vote(id, val) {
    return __awaiter(this, void 0, void 0, function () {
        var dbScore;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("\n    UPDATE recommendations\n    SET score = score + $1\n    WHERE id = $2\n    RETURNING score\n  ", [val, id])];
                case 1:
                    dbScore = _a.sent();
                    return [2 /*return*/, dbScore.rows[0]];
            }
        });
    });
}
function upvote(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vote(id, 1)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function downvote(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, vote(id, -1)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function remove(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("\n    DELETE \n    FROM \"genres_recommendations\"\n    WHERE \"recommendationId\" = $1\n  ", [id])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("\n    DELETE \n    FROM recommendations\n    WHERE id = $1\n  ", [id])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getRecommendationsWithSubQuery(subQuery) {
    return __awaiter(this, void 0, void 0, function () {
        var dbRecommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("\n    SELECT * \n    FROM recommendations\n    " + subQuery + "\n  ")];
                case 1:
                    dbRecommendations = _a.sent();
                    return [2 /*return*/, dbRecommendations.rows];
            }
        });
    });
}
function getGenres() {
    return __awaiter(this, void 0, void 0, function () {
        var dbGenres;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("\n    SELECT * \n    FROM genres\n  ")];
                case 1:
                    dbGenres = _a.sent();
                    return [2 /*return*/, dbGenres.rows];
            }
        });
    });
}
function getGenresRecommendations() {
    return __awaiter(this, void 0, void 0, function () {
        var dbGenres_Recommendations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("\n    SELECT * \n    FROM \"genres_recommendations\"\n  ")];
                case 1:
                    dbGenres_Recommendations = _a.sent();
                    return [2 /*return*/, dbGenres_Recommendations.rows];
            }
        });
    });
}
exports["default"] = {
    create: create,
    remove: remove,
    upvote: upvote,
    downvote: downvote,
    getRecommendationsWithSubQuery: getRecommendationsWithSubQuery,
    getGenres: getGenres,
    getGenresRecommendations: getGenresRecommendations
};
