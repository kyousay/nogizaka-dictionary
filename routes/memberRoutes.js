"use strict";

const router = require("express").Router(),
memberController = require("../controllers/memberController");

router.post("/upload", memberController.checkPermission, memberController.upload)
router.get("/members/:id", memberController.test)
router.get("/members", memberController.getAllMembers),

module.exports = router;