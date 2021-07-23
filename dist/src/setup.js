"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var path = (function () {
    switch (process.env.NODE_ENV) {
        case "test":
            return "./.env.test";
        case "dev":
            return "./.env";
        case "production":
            return "";
    }
})();
dotenv_1["default"].config({ path: path });
