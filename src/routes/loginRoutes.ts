"use strict";

import express from "express";
import loginController from "../controllers/loginController";

const router = express.Router();

router.post("/create", loginController.create);
router.post("/authenticate", loginController.login);

export default router;
