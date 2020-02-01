"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router = require("express").Router(), searchController = require("../controllers/searchController");
exports.router = router;
router.post("/select", searchController.searchSegment);
router.post("/freeword", searchController.test);
