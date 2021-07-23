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
exports.createRecommendation = void 0;
var database_1 = __importDefault(require("../../src/database"));
function createRecommendation(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.youtubeLink, youtubeLink = _c === void 0 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : _c, _d = _b.name, name = _d === void 0 ? "test" : _d, _e = _b.genresIds, genresIds = _e === void 0 ? [1, 2] : _e, _f = _b.score, score = _f === void 0 ? 0 : _f;
    return __awaiter(this, void 0, void 0, function () {
        var dbRecommendationId, newRecommendation, _i, genresIds_1, genreId, dbGenre;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, database_1["default"].query("\n    INSERT INTO recommendations\n    (name, \"youtubeLink\", score)\n    VALUES\n    ($1, $2, $3)\n    RETURNING *\n  ", [name, youtubeLink, score])];
                case 1:
                    dbRecommendationId = _g.sent();
                    newRecommendation = dbRecommendationId.rows[0];
                    newRecommendation.genres = [];
                    _i = 0, genresIds_1 = genresIds;
                    _g.label = 2;
                case 2:
                    if (!(_i < genresIds_1.length)) return [3 /*break*/, 6];
                    genreId = genresIds_1[_i];
                    return [4 /*yield*/, database_1["default"].query("\n      INSERT INTO \"genres_recommendations\"\n      (\"genreId\", \"recommendationId\")\n      VALUES\n      ($1, $2)\n    ", [genreId, newRecommendation.id])];
                case 3:
                    _g.sent();
                    return [4 /*yield*/, database_1["default"].query("\n      SELECT *\n      FROM genres\n      WHERE id = $1\n    ", [genreId])];
                case 4:
                    dbGenre = _g.sent();
                    newRecommendation.genres.push(dbGenre.rows[0]);
                    _g.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/, newRecommendation];
            }
        });
    });
}
exports.createRecommendation = createRecommendation;
