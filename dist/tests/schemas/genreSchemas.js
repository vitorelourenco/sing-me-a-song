"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var recommendationSchemas_1 = __importDefault(require("./recommendationSchemas"));
var dbGenre = joi_1["default"].object({
    id: joi_1["default"].number().integer().min(1).required(),
    name: joi_1["default"].string().min(1).required()
});
var dbGenreList = joi_1["default"].array().items(dbGenre).required();
var dbGenreWithRecommendations = joi_1["default"].object({
    id: joi_1["default"].number().integer().min(1).required(),
    name: joi_1["default"].string().min(1).required(),
    score: joi_1["default"].number().integer().required(),
    recommendations: recommendationSchemas_1["default"].dbRecommendationList
});
exports["default"] = {
    dbGenre: dbGenre,
    dbGenreList: dbGenreList,
    dbGenreWithRecommendations: dbGenreWithRecommendations
};
