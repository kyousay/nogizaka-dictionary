"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router(), memberController = require("../controllers/memberController");
exports.router = router;
router.post("/upload", memberController.checkPermission, memberController.upload);
router.put("/update", memberController.checkPermission, memberController.update);
router.delete("/delete", memberController.checkPermission, memberController.delete);
router.get("/members", memberController.getAllMembers);
