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
exports.closeConnection = exports.fillDatabase = exports.clearGenres = exports.clearRecommendations = exports.clearDatabase = void 0;
var database_1 = __importDefault(require("../../src/database"));
var recommendationFactory_1 = require("../factories/recommendationFactory");
var genreFactory_1 = require("../factories/genreFactory");
function clearDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("TRUNCATE genres_recommendations RESTART IDENTITY")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("DELETE FROM genres")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("ALTER SEQUENCE genres_id_seq RESTART WITH 1")];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("DELETE FROM recommendations")];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("ALTER SEQUENCE recommendations_id_seq RESTART WITH 1")];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearDatabase = clearDatabase;
function clearRecommendations() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("TRUNCATE genres_recommendations RESTART IDENTITY")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("DELETE FROM recommendations")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("ALTER SEQUENCE recommendations_id_seq RESTART WITH 1")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearRecommendations = clearRecommendations;
function clearGenres() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("TRUNCATE genres_recommendations RESTART IDENTITY")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("DELETE FROM genres")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, database_1["default"].query("ALTER SEQUENCE genres_id_seq RESTART WITH 1")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.clearGenres = clearGenres;
function fillDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var pg, pr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clearDatabase()];
                case 1:
                    _a.sent();
                    pg = [];
                    pg.push(genreFactory_1.createGenre({ name: "electronic" }));
                    pg.push(genreFactory_1.createGenre({ name: "pop" }));
                    pg.push(genreFactory_1.createGenre({ name: "hiphop" }));
                    pg.push(genreFactory_1.createGenre({ name: "rock" }));
                    pg.push(genreFactory_1.createGenre({ name: "blues" }));
                    pg.push(genreFactory_1.createGenre({ name: "gospel" }));
                    pg.push(genreFactory_1.createGenre({ name: "funk" }));
                    pg.push(genreFactory_1.createGenre({ name: "opera" }));
                    pg.push(genreFactory_1.createGenre({ name: "rap" }));
                    pg.push(genreFactory_1.createGenre({ name: "swing" }));
                    pg.push(genreFactory_1.createGenre({ name: "classical" }));
                    return [4 /*yield*/, Promise.all(pg)];
                case 2:
                    _a.sent();
                    pr = [];
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.com/watch?v=avYphbJsbaM",
                        name: "test1",
                        score: 200,
                        genresIds: [1, 2]
                    }));
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.com/watch?v=FJBgzX2HMe8",
                        name: "test2",
                        score: -5,
                        genresIds: [11, 1]
                    }));
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.com/watch?v=C06jmdXfVF0",
                        name: "test3",
                        score: 7,
                        genresIds: [9, 7, 6]
                    }));
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.com/watch?v=pqLvFfwcqfw",
                        name: "test4",
                        score: 15,
                        genresIds: [4, 3, 2]
                    }));
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.com/watch?v=ub3pgNSL0S4",
                        name: "test5",
                        score: 30,
                        genresIds: [5, 10]
                    }));
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.com/watch?v=mxSRmLBuL4k",
                        name: "test6",
                        score: 10,
                        genresIds: [11]
                    }));
                    pr.push(recommendationFactory_1.createRecommendation({
                        youtubeLink: "https://www.youtube.https://www.youtube.com/watch?v=JqnQ1R61MoM/watch?v=mxSRmLBuL4k",
                        name: "test7",
                        score: 11,
                        genresIds: [4, 8]
                    }));
                    return [4 /*yield*/, Promise.all(pr)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fillDatabase = fillDatabase;
function closeConnection() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1["default"].end()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.closeConnection = closeConnection;
