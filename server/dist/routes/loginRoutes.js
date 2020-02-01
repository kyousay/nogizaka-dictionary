"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router(), loginController = require("../controllers/loginController");
exports.router = router;
router.post("/create", loginController.create);
router.post("/authenticate", loginController.login);
