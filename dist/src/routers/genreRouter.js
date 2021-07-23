"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var genreController_1 = __importDefault(require("../controllers/genreController"));
var genres = express_1.Router();
genres.post("/", genreController_1["default"].create);
genres.get("/", genreController_1["default"].getAll);
genres.get("/:id", genreController_1["default"].getById);
exports["default"] = genres;
