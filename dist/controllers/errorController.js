"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var http_status_codes_1 = __importDefault(require("http-status-codes"));
module.exports = {
    logErrors: function (error, req, res, next) {
        console.log(error.stack);
        next(error);
    },
    pageNotFoundError: function (req, res) {
        var errorCode = http_status_codes_1.default.NOT_FOUND;
        res.status(errorCode);
        res.send(errorCode);
    },
    internalServerError: function (error, req, res, next) {
        var errorCode = http_status_codes_1.default.INTERNAL_SERVER_ERROR;
        res.sendStatus(errorCode);
    }
};
