import express from "express";

import {
  getComplaints,
  createComplaint,
  deleteComplaint,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

router.get("/", getComplaints);
router.post("/", createComplaint);
router.delete("/:id", deleteComplaint);
router.put("/:id", updateComplaintStatus);

export default router;