

import express from "express";

import {
  getVisitors,
  createVisitor,
  updateVisitorStatus,
  checkInVisitor,
  checkOutVisitor,
  deleteVisitor,
} from "../controllers/visitorController.js";


const router = express.Router();


// GET
router.get(
  "/",
  getVisitors
);


// CREATE
router.post(
  "/",
  createVisitor
);


// STATUS
router.put(
  "/:id/status",
  updateVisitorStatus
);


// CHECK IN
router.put(
  "/:id/check-in",
  checkInVisitor
);


// CHECK OUT
router.put(
  "/:id/check-out",
  checkOutVisitor
);


// DELETE
router.delete(
  "/:id",
  deleteVisitor
);


export default router;