"use strict";

const router = require("express").Router(),
memberController = require("../controllers/memberController");

router.post("/upload", memberController.test)

module.exports = router;