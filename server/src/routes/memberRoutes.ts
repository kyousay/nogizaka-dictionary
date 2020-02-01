"use strict";

const router = require("express").Router(),
memberController = require("../controllers/memberController");

router.post("/upload", memberController.checkPermission, memberController.upload)
router.put("/update", memberController.checkPermission, memberController.update)
router.delete("/delete", memberController.checkPermission, memberController.delete)
router.get("/members", memberController.getAllMembers)

export {router};