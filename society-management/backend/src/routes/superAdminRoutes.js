
// export default router;
import express from "express";

import {
  getSuperAdminDashboard,
  getAllSocieties,
  createSociety,
  updateSociety,
  deleteSociety,
  getAllSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getAllActivityLogs,
  getActivityLogStats,
} from "../controllers/superAdminController.js";

import {
  protect,
  superAdminOnly,
} from "../middleware/authMiddleware.js";


const router = express.Router();


/* =====================================================
   SUPER ADMIN DASHBOARD
===================================================== */

router.get(
  "/dashboard",
  protect,
  superAdminOnly,
  getSuperAdminDashboard
);


/* =====================================================
   SOCIETIES
===================================================== */

router.get(
  "/societies",
  protect,
  superAdminOnly,
  getAllSocieties
);

router.post(
  "/societies",
  protect,
  superAdminOnly,
  createSociety
);

router.put(
  "/societies/:id",
  protect,
  superAdminOnly,
  updateSociety
);

router.delete(
  "/societies/:id",
  protect,
  superAdminOnly,
  deleteSociety
);


/* =====================================================
   SUBSCRIPTIONS
===================================================== */

router.get(
  "/subscriptions",
  protect,
  superAdminOnly,
  getAllSubscriptions
);

router.post(
  "/subscriptions",
  protect,
  superAdminOnly,
  createSubscription
);

router.put(
  "/subscriptions/:id",
  protect,
  superAdminOnly,
  updateSubscription
);

router.delete(
  "/subscriptions/:id",
  protect,
  superAdminOnly,
  deleteSubscription
);


/* =====================================================
   ACTIVITY LOGS
===================================================== */

router.get(
  "/activity-logs",
  protect,
  superAdminOnly,
  getAllActivityLogs
);

router.get(
  "/activity-logs/stats",
  protect,
  superAdminOnly,
  getActivityLogStats
);


export default router;