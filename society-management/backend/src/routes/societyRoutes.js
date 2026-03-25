import express from "express";
import {
  createSociety,
  getSocieties,
  updateSociety,
  deleteSociety,
  getSocietyUsers,
  joinSociety,
} from "../controllers/societyController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ONLY SUPER ADMIN
router.post("/", protect, authorizeRoles("SUPER_ADMIN"), createSociety);
router.put("/:id", protect, authorizeRoles("SUPER_ADMIN"), updateSociety);
router.delete("/:id", protect, authorizeRoles("SUPER_ADMIN"), deleteSociety);

// ALL USERS
router.get("/", protect, getSocieties);
router.get("/:id/users", protect, getSocietyUsers);
router.post("/:id/join", protect, joinSociety);

export default router;