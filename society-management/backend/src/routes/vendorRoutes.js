import express from "express";

import {
  createVendor,
  getVendors,
  deleteVendor,
} from "../controllers/vendorController.js";

const router = express.Router();

router.post("/", createVendor);

router.get("/", getVendors);

router.delete("/:id", deleteVendor);

export default router;