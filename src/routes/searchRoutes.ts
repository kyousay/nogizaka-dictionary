"use strict";

import express from "express";
import searchController from "../controllers/searchController";

const router = express.Router();

router.post("/select", searchController.searchSegment);
router.post("/freeword", searchController.searchFreeword);

export default router;
