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
var genreService_1 = __importDefault(require("../services/genreService"));
var genreSchemas_1 = __importDefault(require("../schemas/genreSchemas"));
var errorWithStatus_1 = require("../utils/errorWithStatus");
function create(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var badRequest, newGenre, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    badRequest = genreSchemas_1["default"].create.validate(req.body).error;
                    if (badRequest)
                        return [2 /*return*/, res.sendStatus(400)];
                    return [4 /*yield*/, genreService_1["default"].create(req.body)];
                case 1:
                    newGenre = _a.sent();
                    res.status(201).send(newGenre);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    errorWithStatus_1.printError(err_1);
                    //postgres status code for unique_violation https://www.postgresql.org/docs/9.2/errcodes-appendix.html
                    if ((err_1 === null || err_1 === void 0 ? void 0 : err_1.code) === "23505")
                        return [2 /*return*/, res.sendStatus(409)];
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var genreList, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, genreService_1["default"].getAll()];
                case 1:
                    genreList = _a.sent();
                    res.send(genreList);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    errorWithStatus_1.printError(err_2);
                    if ((err_2 === null || err_2 === void 0 ? void 0 : err_2.code()) === "smas404")
                        return [2 /*return*/, res.sendStatus(404)];
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, genreWithRecommendations, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, genreService_1["default"].getById(id)];
                case 1:
                    genreWithRecommendations = _a.sent();
                    res.send(genreWithRecommendations);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    errorWithStatus_1.printError(err_3);
                    if ((err_3 === null || err_3 === void 0 ? void 0 : err_3.code()) === "smas404")
                        return [2 /*return*/, res.sendStatus(404)];
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports["default"] = {
    create: create,
    getAll: getAll,
    getById: getById
};
