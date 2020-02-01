"use strict"

import express from "express";
import {router as loginRoutes} from "./loginRoutes";
import {router as userRoutes} from "./userRoutes";
import {router as errorRoutes} from "./errorRoutes";
import {router as memberRoutes} from "./memberRoutes";
import {router as searchRoutes} from "./searchRoutes";
import {router as talkRoutes} from "./talkRoutes";
import loginController from "../controllers/loginController";

const router = express.Router()

router.use("/login", loginRoutes);

router.use("/", loginController.verifyJWT)

router.use("/user", userRoutes);
router.use("/member", memberRoutes);
router.use("/search", searchRoutes);
router.use("/talk", talkRoutes);
router.use("/", errorRoutes);

export {router};