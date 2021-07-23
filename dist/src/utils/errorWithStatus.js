"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.printError = void 0;
var ErrorWithStatus = /** @class */ (function (_super) {
    __extends(ErrorWithStatus, _super);
    function ErrorWithStatus(msg) {
        var _this = _super.call(this, msg) || this;
        Object.setPrototypeOf(_this, ErrorWithStatus.prototype);
        return _this;
    }
    ErrorWithStatus.prototype.code = function () {
        return this.message;
    };
    return ErrorWithStatus;
}(Error));
exports["default"] = ErrorWithStatus;
var printError = function (err) {
    if ((err === null || err === void 0 ? void 0 : err.code) && (err === null || err === void 0 ? void 0 : err.detail)) {
        console.error("database error " + err.detail, err.code);
    }
    else if (err === null || err === void 0 ? void 0 : err.code()) {
        console.error("smas error with HTML statuscode", err.code());
    }
    else {
        console.error(err.message);
    }
};
exports.printError = printError;
