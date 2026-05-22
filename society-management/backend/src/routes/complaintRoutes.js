

import express from "express";
import {
  createComplaint,
  getComplaints,
  deleteComplaint,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  createComplaint
);

router.get("/", getComplaints);

router.delete("/:id", deleteComplaint);

router.put("/:id/status", updateComplaintStatus);

export default router;