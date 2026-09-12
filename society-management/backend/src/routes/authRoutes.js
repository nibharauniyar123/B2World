
import express from "express";

import {
  register,
  login,
  forgotPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// register
router.post(
  "/register",
  register
);


// login
router.post(
  "/login",
  login
);


// profile
router.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json(req.user);
  }
);
router.post("/forgot-password", (req, res) => {
  res.json({
    message: "Forgot Password API Working",
  });
});

export default router;