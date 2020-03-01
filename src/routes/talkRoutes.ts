"use strict";

import express from "express";
import talkController from "../controllers/talkController";

const router = express.Router();

router.get("/getTalkRooms", talkController.getAllRooms);
router.post(
  "/getTalkRoom",
  talkController.checkPassword,
  talkController.getRoom
);
router.post("/create", talkController.createRoom);

export default router;
