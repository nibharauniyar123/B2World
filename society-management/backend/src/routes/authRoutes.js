
import express from "express";

import {
  register,
  login,
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

export default router;