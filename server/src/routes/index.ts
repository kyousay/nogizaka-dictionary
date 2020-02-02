"use strict";

import express from "express";
import loginRoutes from "./loginRoutes";
import userRoutes from "./userRoutes";
import errorRoutes from "./errorRoutes";
import memberRoutes from "./memberRoutes";
import searchRoutes from "./searchRoutes";
import talkRoutes from "./talkRoutes";
import loginController from "../controllers/loginController";

const router = express.Router();

router.use("/login", loginRoutes);

router.use("/", loginController.verifyJWT);

router.use("/user", userRoutes);
router.use("/member", memberRoutes);
router.use("/search", searchRoutes);
router.use("/talk", talkRoutes);
router.use("/", errorRoutes);

export default router;
