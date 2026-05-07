import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getDashboardStats);

export default router;