"use strict";

const router = require("express").Router(),
talkController = require("../controllers/talkController");

router.post("/create", talkController.createRoom);

module.exports = router;