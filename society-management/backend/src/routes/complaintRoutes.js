import express from "express"
import { createComplaint, getComplaints } from "../controllers/complaintController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", protect, createComplaint)

router.get("/", protect, getComplaints)

export default router