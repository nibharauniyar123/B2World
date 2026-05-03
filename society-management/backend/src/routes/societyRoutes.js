import express from "express";

import {
  getSocieties,
  createSociety,
  deleteSociety,
  updateSociety,
} from "../controllers/societyController.js";

const router = express.Router();

router.get("/", getSocieties);
router.post("/", createSociety);
router.delete("/:id", deleteSociety);
router.put("/:id", updateSociety);

export default router;