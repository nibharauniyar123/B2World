import express from "express";

import {
  getVisitors,
  createVisitor,
  deleteVisitor,
} from "../controllers/visitorController.js";

const router = express.Router();

router.get("/", getVisitors);
router.post("/", createVisitor);
router.delete("/:id", deleteVisitor);

export default router;