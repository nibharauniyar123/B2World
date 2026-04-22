import express from "express";
import {createMaintenance,getMaintenance} from "../controllers/maintenanceController.js";

const router = express.Router();

router.post("/",createMaintenance);
router.get("/",getMaintenance);

export default router;