
// import  express from "express";
// const router = express.Router()

// const userController = require("../controllers/userController")
// const { getUsers } = require("../controllers/userController")
// const authMiddleware = require("../middleware/authMiddleware")
// const roleMiddleware = require("../middleware/roleMiddleware")
// const {getMe} = require("../controllers/userController")    

// router.get(
//  "/",
//  protect, getUsers
// );

// router.delete(
//  "/:id",
//  authMiddleware,
//  roleMiddleware(["ADMIN"]),
//  userController.deleteUser
// )

// router.put(
//  "/:id/role",
//  authMiddleware,
//  roleMiddleware(["ADMIN"]),
//  userController.changeUserRole
// )


// router.get("/me", authMiddleware, getMe)

// export default router;

import express from "express";
import {
  createUser,
  getUsers,
  deleteUser,
  changeUserRole,
  getMe,
} from "../controllers/userController.js";

import { protect} from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, createUser);
router.get("/", protect, getUsers);
router.delete("/:id", protect, deleteUser);
router.put("/:id/role", protect, changeUserRole);
router.get("/me", protect , getMe);

export default router;