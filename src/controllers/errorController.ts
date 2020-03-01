"use strict";

import httpStatus from "http-status-codes";
import { Request, Response, NextFunction } from "express";

export = {
  logErrors: (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error.stack);
    next(error);
  },

  pageNotFoundError: (req: Request, res: Response) => {
    const errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(errorCode);
  },

  internalServerError: (error: any, req: Request, res: Response, next: NextFunction) => {
    const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.sendStatus(errorCode);
  }
};
