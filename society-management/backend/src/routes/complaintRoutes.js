import express from "express";
import {
  createComplaint,
  getComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComplaint);
router.get("/", protect, getComplaints);
router.put("/:id", protect, updateComplaintStatus);

export default router;