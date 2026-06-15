import express from "express";
import {
  createComplaint,
  getComplaints,
  deleteComplaint,
  updateComplaintStatus,
  updateComplaint,
  assignComplaint,
  resolveComplaint,
  addFeedback,
  assignVendor,
} from "../controllers/complaintController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create Complaint
router.post(
  "/",
  upload.single("file"),
  createComplaint
);

// Get All Complaints
router.get(
  "/",
  getComplaints
);

// Delete Complaint
router.delete(
  "/:id",
  deleteComplaint
);

// Update Complaint Status
router.put(
  "/:id/status",
  updateComplaintStatus
);

// Update Complaint
router.put(
  "/:id",
  upload.single("file"),
  updateComplaint
);

// Assign Staff
router.put(
  "/:id/assign",
  assignComplaint
);

// Resolve Complaint
router.put(
  "/:id/resolve",
  resolveComplaint
);

// Feedback & Rating
router.put(
  "/:id/feedback",
  addFeedback
);

// Assign Vendor
router.put(
  "/:id/vendor",
  assignVendor
);

export default router;