"use strict";

import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.put("/update", userController.update);
router.put("/favorite", userController.favorite);
router.put("/unfavorite", userController.unfavorite);

export default router;
