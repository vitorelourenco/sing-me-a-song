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
var genreSchemas_1 = __importDefault(require("../schemas/genreSchemas"));
var database_1 = require("../utils/database");
var genres_1 = __importDefault(require("../utils/genres"));
expect.extend({ toMatchSchema: toMatchSchema_1["default"] });
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.clearDatabase()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, database_1.clearGenres()];
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
describe("POST /genres", function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearGenres()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var postThis = function (data) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.post("/genres").send(data)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 201 for a successful request", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(genres_1["default"].valid)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with the valid created genre", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(genres_1["default"].valid)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(genreSchemas_1["default"].dbGenre);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 for a payload that is not an Object", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(genres_1["default"].wrongType)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 when property name is missing", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(genres_1["default"].missingProps)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 400 when property name is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(genres_1["default"].emptyProps)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 409 when the genre name is taken", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, postThis(genres_1["default"].valid)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, postThis(genres_1["default"].valid)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET /genres", function () {
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
    var getGenres = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, agent.get("/genres")];
    }); }); };
    it("should respond with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGenres()];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a list of valid genres", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGenres()];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(genreSchemas_1["default"].dbGenreList);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if the DB is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getGenres()];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET /genres/:id", function () {
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
    var getGenreById = function (id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, agent.get("/genres/" + id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    }); }); };
    it("should respond with status 200", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGenreById(1)];
                case 1:
                    response = _a.sent();
                    expect(response.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with a genre object with its recommendations", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getGenreById(1)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchSchema(genreSchemas_1["default"].dbGenreWithRecommendations);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should respond with status 404 if the DB is empty", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, database_1.clearDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getGenreById(1)];
                case 2:
                    response = _a.sent();
                    expect(response.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
