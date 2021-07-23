"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var dbRecommendation = joi_1["default"].object({
    id: joi_1["default"].number().integer().min(1).required(),
    name: joi_1["default"].string().min(1).required(),
    genres: joi_1["default"]
        .array()
        .unique()
        .items(joi_1["default"]
        .object({
        id: joi_1["default"].number().integer().min(1).required(),
        name: joi_1["default"].string().min(1).required()
    })
        .required())
        .required(),
    youtubeLink: joi_1["default"].string().min(1).required(),
    score: joi_1["default"].number().integer()
});
var dbRecommendationList = joi_1["default"].array().items(dbRecommendation).required();
exports["default"] = {
    dbRecommendation: dbRecommendation,
    dbRecommendationList: dbRecommendationList
};
