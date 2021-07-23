"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("./setup");
var app_1 = __importDefault(require("./app"));
var port = process.env.PORT;
app_1["default"].listen(port, function () {
    console.log("Server is listening on port " + port + ".");
});
