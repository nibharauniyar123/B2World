// import express from "express";

// import {
//   getNotifications,
//   createNotification,
//   deleteNotification,
// } from "../controllers/notificationController.js";

// const router = express.Router();

// router.get("/", getNotifications);

// router.post("/", createNotification);

// router.delete("/:id", deleteNotification);

// export default router;
import express from "express";

import {
  getNotifications,
  getUnreadCount,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in user's notifications
router.get(
  "/",
  protect,
  getNotifications
);

// Get unread notification count
router.get(
  "/unread-count",
  protect,
  getUnreadCount
);

// Create notification
router.post(
  "/",
  protect,
  createNotification
);

// Mark all notifications as read
router.put(
  "/read-all",
  protect,
  markAllAsRead
);

// Mark one notification as read
router.put(
  "/:id/read",
  protect,
  markAsRead
);

// Delete notification
router.delete(
  "/:id",
  protect,
  deleteNotification
);

export default router;