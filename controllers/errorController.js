"use strict";

const httpStatus = require("http-status-codes");
module.exports = {
    logErrors: (error, req, res, next) => {
        console.log(error.stack);
        next(error)
    },

    pageNotFoundError: (req, res) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        res.send(errorCode);
    },

    internalServerError: (error, req, res, next) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        res.status(errorCode);
        res.send(`${errorCode} | Sorry, our application is experiencing a problem!`)
    }


}