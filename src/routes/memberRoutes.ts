"use strict";

import express from "express";
import memberController from "../controllers/memberController";

const router = express.Router();

router.post(
  "/upload",
  memberController.checkPermission,
  memberController.upload
);
router.put(
  "/update",
  memberController.checkPermission,
  memberController.update
);
router.delete(
  "/delete",
  memberController.checkPermission,
  memberController.delete
);
router.get("/members", memberController.getAllMembers);

export default router;
