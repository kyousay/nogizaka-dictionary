"use strict";

import express from "express";
import errorController from "../controllers/errorController";

const router = express.Router();

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

export default router;
