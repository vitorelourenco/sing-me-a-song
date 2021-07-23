"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var genreRouter_1 = __importDefault(require("./routers/genreRouter"));
var recommendationRouter_1 = __importDefault(require("./routers/recommendationRouter"));
var app = express_1["default"]();
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use("/genres", genreRouter_1["default"]);
app.use("/recommendations", recommendationRouter_1["default"]);
exports["default"] = app;
