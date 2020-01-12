"use strict";

const router = require("express").Router(),
searchController = require("../controllers/searchController");

router.post("/select", searchController.searchSegment);

module.exports = router;