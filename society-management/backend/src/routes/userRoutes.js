import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);           // ← This is what frontend calls
router.delete("/:id", deleteUser);

export default router;