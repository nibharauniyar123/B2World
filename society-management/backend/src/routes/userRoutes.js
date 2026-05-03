import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  changeUserRole,
  getMe,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id/role", changeUserRole);
router.get("/me", getMe);

export default router;