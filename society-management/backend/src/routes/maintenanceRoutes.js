import express from "express";

import {
  getMaintenance,
  createMaintenance,
  deleteMaintenance,
  updateMaintenance,
} from "../controllers/maintenanceController.js";

const router =
  express.Router();

router.get(
  "/",
  getMaintenance
);

router.post(
  "/",
  createMaintenance
);

router.delete(
  "/:id",
  deleteMaintenance
);

router.put(
  "/:id",
  updateMaintenance
);

export default router;