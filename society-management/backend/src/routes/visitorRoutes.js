import express from "express";
import { createVisitor, getVisitors } from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", createVisitor);
router.get("/", getVisitors);

export default router;