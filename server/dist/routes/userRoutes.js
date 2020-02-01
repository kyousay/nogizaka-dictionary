"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router(), userController = require("../controllers/userController");
exports.router = router;
router.put("/update", userController.update);
router.put("/favorite", userController.favorite);
router.put("/unfavorite", userController.unfavorite);
