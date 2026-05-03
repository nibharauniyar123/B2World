import express from "express";
import {
  getFlats,
  createFlat,
  deleteFlat,
  updateFlat
} from "../controllers/flatController.js";

const router = express.Router();

router.get("/", getFlats);
router.post("/", createFlat);   // ✅ IMPORTANT
router.put("/:id", updateFlat); // ✅ IMPORTANT
router.delete("/:id", deleteFlat);

export default router;