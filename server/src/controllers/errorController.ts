"use strict";

import httpStatus from "http-status-codes";

export = {
    logErrors: (error: any, req: any, res: any, next: any) => {
        console.log(error.stack);
        next(error)
    },

    pageNotFoundError: (req: any, res: any) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        res.send(errorCode);
    },

    internalServerError: (error: any, req: any, res: any, next: any) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        res.sendStatus(errorCode);
        res.sendStatus(`${errorCode} | Sorry, our application is experiencing a problem!`)
    }


}