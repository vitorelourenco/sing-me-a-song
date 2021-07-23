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
require("../../src/setup");
var supertest_1 = __importDefault(require("supertest"));
var app_1 = __importDefault(require("../../src/app"));
var toMatchSchema_1 = __importDefault(require("../schemas/toMatchSchema"));
var recommendations_1 = __importDefault(require("../utils/recommendations"));
var recommendationSchemas_1 = __importDefault(require("../schemas/recommendationSchemas"));
var database_1 = require("../utils/database");
var recommendationFactory_1 = require("../factories/recommendationFactory");
expect.extend({ toMatchSchema: toMatchSchema_1["default"] });
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.fillDatabase()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.closeConnection()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var agent = supertest_1["default"](app_1["default"]);
describe("POST /recommendations", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearRecommendations()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var postThis = function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.post("/recommendations").send(data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 201 for a successful request", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].valid)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with the valid created recommendation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].valid)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(recommendationSchemas_1["default"].dbRecommendation);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 for a payload that is not an Object", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].wrongType)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 when the properties are missing", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].missingProps)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 when the properties are empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].emptyProps)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 when any youtubeLink is not a youtube link", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].linkNotFromYoutube)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 when the requested genreId does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].genreIdNotRegistered)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 409 when the youtubeLink is taken", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(recommendations_1["default"].valid)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postThis(recommendations_1["default"].valid)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST /recommendations/:id/upvote", function () {
    var recommendation;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearRecommendations()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, recommendationFactory_1.createRecommendation()];
                case 2:
                    recommendation = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var upvoteThis = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.post("/recommendations/" + id + "/upvote")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 200 if the ID exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, upvoteThis(recommendation.id)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with score 1 when upvoting a new recommendation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, upvoteThis(recommendation.id)];
                case 1:
                    response = _a.sent();
                    expect(response.body.score).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if the ID does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, upvoteThis(2147483647)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("POST /recommendations/:id/downvote", function () {
    var recommendation;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearRecommendations()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, recommendationFactory_1.createRecommendation()];
                case 2:
                    recommendation = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var downvoteThis = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.post("/recommendations/" + id + "/downvote")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 200 if the ID exists", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, downvoteThis(recommendation.id)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with score -1 when downvoting a new recommendation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, downvoteThis(recommendation.id)];
                case 1:
                    response = _a.sent();
                    expect(response.body.score).toEqual(-1);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 when score reaches -6", function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, downvoteThis(recommendation.id)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, downvoteThis(recommendation.id)];
                case 5:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if the ID does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, downvoteThis(2147483647)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET /recommendations/random", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.fillDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var getRandom = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.get("/recommendations/random")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRandom()];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a valid recommendation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRandom()];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(recommendationSchemas_1["default"].dbRecommendation);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if the database is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getRandom()];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET /recommendations/top/:amount", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.fillDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var getTop = function (amount) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.get("/recommendations/top/" + amount)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    var amount = 5;
    it("should respond with status 200 if there are items in DB", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTop(amount)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 200 regardless of $AMOUNT if there are items in DB", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTop(NaN)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a valid list of recommendations", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTop(amount)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(recommendationSchemas_1["default"].dbRecommendationList);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a list not larger than $AMOUNT", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTop(amount)];
                case 1:
                    response = _a.sent();
                    expect(response.body.length).toBeLessThanOrEqual(amount);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if the database is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTop(amount)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET /recommendations/genres/:id/random", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.fillDatabase()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var getRandomOfGenreId = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.get("/recommendations/genres/" + id + "/random")];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRandomOfGenreId(1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a valid recommendation", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRandomOfGenreId(1)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(recommendationSchemas_1["default"].dbRecommendation);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a recommendation that contains the genre", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, includesGenre;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRandomOfGenreId(1)];
                case 1:
                    response = _a.sent();
                    includesGenre = !!response.body.genres.find(function (genre) { return genre.id === 1; });
                    expect(includesGenre).toEqual(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if no results are found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getRandomOfGenreId(1)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
