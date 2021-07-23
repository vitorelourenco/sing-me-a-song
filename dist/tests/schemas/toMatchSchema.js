"use strict";
exports.__esModule = true;
var toMatchSchema = function (received, joiSchema) {
    var error = joiSchema.validate(received).error;
    var pass = !error;
    if (pass) {
        return {
            message: function () { return "Success"; },
            pass: pass
        };
    }
    else {
        return {
            message: function () {
                var details = error.details;
                var message = details.map(function (i) { return ({
                    message: i.message,
                    path: i.path,
                    validationFailed: i.type.split(".").pop()
                }); });
                return JSON.stringify(message);
            },
            pass: pass
        };
    }
};
exports["default"] = toMatchSchema;
