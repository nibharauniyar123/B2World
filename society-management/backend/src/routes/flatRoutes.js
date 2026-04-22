import express from "express";
import {
  createFlat,
  getFlats,
  getFlatById,
  updateFlat,
  deleteFlat
} from "../controllers/flatController.js";

const router = express.Router();

/* CREATE FLAT */
router.post("/", createFlat);

/* GET ALL FLATS */
router.get("/", getFlats);

/* GET SINGLE FLAT */
router.get("/:id", getFlatById);

/* UPDATE FLAT */
router.put("/:id", updateFlat);

/* DELETE FLAT */
router.delete("/:id", deleteFlat);

export default router;