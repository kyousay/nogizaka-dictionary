"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router(), talkController = require("../controllers/talkController");
exports.router = router;
router.get("/getTalkRooms", talkController.getAllRooms);
router.post("/getTalkRoom", talkController.checkPassword, talkController.getRoom);
router.post("/create", talkController.createRoom);
