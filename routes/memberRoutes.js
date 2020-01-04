"use strict";

const router = require("express").Router(),
memberController = require("../controllers/memberController");

router.post("/upload", memberController.checkPermission, memberController.upload)
router.put("/update", memberController.checkPermission, memberController.update, memberController.getAllMembers)
router.get("/members", memberController.getAllMembers)

module.exports = router;