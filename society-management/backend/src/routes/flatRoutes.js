// import express from "express";
// import {
//   getFlats,
//   createFlat,
//   updateFlat,
//   getFlatById,
//   deleteFlat,
// } from "../controllers/flatController.js";

// const router = express.Router();
// router.get("/", getFlats);
// router.get("/:id", getFlatById);
// router.post("/", createFlat);
// router.put("/:id", updateFlat);
// router.delete("/:id", deleteFlat);

// export default router;
import express from "express";
import {
  getFlats,
  getFlatById,
  createFlat,
  updateFlat,
  deleteFlat,
  updateOccupancy,
  assignResident,
} from "../controllers/flatController.js";

const router = express.Router();

router.get("/", getFlats);
router.get("/:id", getFlatById);   // ✅ THIS MUST EXIST
router.post("/", createFlat);
router.put("/:id", updateFlat);
router.delete("/:id", deleteFlat);
router.put("/:id/status", updateOccupancy);
router.put(
"/:id/assign",
assignResident
);

export default router;