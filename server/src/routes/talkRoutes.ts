"use strict";

const router = require("express").Router(),
talkController = require("../controllers/talkController");

router.get("/getTalkRooms", talkController.getAllRooms);
router.post("/getTalkRoom", talkController.checkPassword, talkController.getRoom);
router.post("/create", talkController.createRoom);

export {router};