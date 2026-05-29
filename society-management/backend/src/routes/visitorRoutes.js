import express from "express";

import {
  createVisitor,
  getVisitors,
  updateVisitorStatus,
} from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", createVisitor);

router.get("/", getVisitors);
router.put("/:id", updateVisitorStatus);

export default router;