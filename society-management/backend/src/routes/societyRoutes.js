// import express from "express";
// import {
//   createSociety,
//   getSocieties,
//   updateSociety,
//   deleteSociety,
//   getSocietyUsers,
//   joinSociety,
// } from "../controllers/societyController.js";

// import { protect } from "../middleware/authMiddleware.js";
// import { authorizeRoles } from "../middleware/roleMiddleware.js";

// const router = express.Router();

// // ONLY SUPER ADMIN
// router.post("/", protect, authorizeRoles("ADMIN"), createSociety);
// router.put("/:id", protect, authorizeRoles("ADMIN"), updateSociety);
// router.delete("/:id", protect, authorizeRoles("ADMIN"), deleteSociety);

// // ALL USERS
// router.get("/", protect, getSocieties);
// router.get("/users/:id", protect, getSocietyUsers);
// router.post("/join/:id", protect, joinSociety);

// export default router;

import express from "express";
import {createSociety,getSocieties} from "../controllers/societyController.js";

const router = express.Router();

router.post("/",createSociety);
router.get("/",getSocieties);

export default router;