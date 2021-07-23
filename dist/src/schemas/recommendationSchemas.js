"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var joi_1 = __importDefault(require("joi"));
var create = joi_1["default"].object({
    name: joi_1["default"].string().min(1).required(),
    genresIds: joi_1["default"]
        .array()
        .unique()
        .items(joi_1["default"].number().integer().min(1).required())
        .required(),
    youtubeLink: joi_1["default"].string().min(1).required()
});
exports["default"] = {
    create: create
};
