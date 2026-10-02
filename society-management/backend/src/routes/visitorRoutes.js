

import express from "express";

import {
  getVisitors,
  createVisitor,
  updateVisitorStatus,
  checkInVisitor,
  checkOutVisitor,
  deleteVisitor,
  scanVisitorQR,
} from "../controllers/visitorController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


const router = express.Router();


// GET
// router.get(
//   "/",
//   protect,
//   getVisitors
// );
router.get(
  "/",
  protect,
  authorizeRoles(
    "ADMIN",
    "GUARD",
    "RESIDENT"
  ),
  getVisitors
);


// CREATE
router.post(
  "/",
  protect,
  createVisitor
);


// STATUS
// router.put(
//   "/:id/status",
//   protect,
//   updateVisitorStatus
// );
router.put(
  "/:id/status",
  protect,
  authorizeRoles("ADMIN"),
  updateVisitorStatus
);


// // QR SCANNER
// router.post(
//   "/scan-qr",
//   protect,
//   // authorizeRoles("ADMIN", "GUARD"),
//   scanVisitorQR
// );



// // CHECK IN
// router.put(
//   "/:id/check-in",
//   protect,
//   // authorizeRoles("ADMIN", "GUARD"),
//   checkInVisitor
// );


// // CHECK OUT
// router.put(
//   "/:id/check-out",
//   protect,
//   checkOutVisitor
// );

router.post(
  "/scan",
  protect,
  authorizeRoles("ADMIN", "GUARD"),
  scanVisitorQR
);

router.put(
  "/:id/check-in",
  protect,
  authorizeRoles("ADMIN", "GUARD"),
  checkInVisitor
);

router.put(
  "/:id/check-out",
  protect,
  authorizeRoles("ADMIN", "GUARD"),
  checkOutVisitor
);


// DELETE
router.delete(
  "/:id",
  protect,
  deleteVisitor
);


export default router;