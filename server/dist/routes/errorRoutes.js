"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router(), errorController = require("../controllers/errorController");
exports.router = router;
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);
