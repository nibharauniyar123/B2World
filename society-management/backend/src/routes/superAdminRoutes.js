
// import express from "express";

// import {
//   getSuperAdminDashboard,
// } from "../controllers/superAdminController.js";

// import {
//   superAdminOnly,
// } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get(
//   "/dashboard",
//   superAdminOnly,
//   getSuperAdminDashboard
// );

// export default router;
import express from "express";

import {
  getSuperAdminDashboard,
  getAllSocieties,
  createSociety,
  updateSociety,
  deleteSociety,
} from "../controllers/superAdminController.js";

import {
  superAdminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Dashboard
router.get(
  "/dashboard",
  superAdminOnly,
  getSuperAdminDashboard
);


// Society Management
router.get(
  "/societies",
  superAdminOnly,
  getAllSocieties
);

router.post(
  "/societies",
  superAdminOnly,
  createSociety
);

router.put(
  "/societies/:id",
  superAdminOnly,
  updateSociety
);

router.delete(
  "/societies/:id",
  superAdminOnly,
  deleteSociety
);


export default router;