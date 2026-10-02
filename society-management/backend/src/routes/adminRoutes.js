// import express from "express";
// import { getDashboardStats } from "../controllers/dashboardController.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/dashboard", protect, isAdmin, getDashboardStats);

// export default router;
import express from "express";

import { getAdminDashboard } from "../controllers/adminController.js";

import {
  protect,
  isAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// SOCIETY ADMIN DASHBOARD
// ==========================================
router.get(
  "/dashboard",
  protect,
  isAdmin,
  getAdminDashboard
);

export default router;