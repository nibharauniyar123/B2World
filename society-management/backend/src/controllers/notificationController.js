// import prisma from "../prisma/prismaClient.js";

// // GET ALL NOTIFICATIONS
// export const getNotifications = async (req, res) => {
//   try {
//     const notifications = await prisma.notification.findMany({
//       orderBy: {
//         id: "desc",
//       },
//     });

//     res.json(notifications);

//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// // CREATE NOTIFICATION
// export const createNotification = async (req, res) => {
//   try {
//     const { title, message } = req.body;

//     const notification = await prisma.notification.create({
//       data: {
//         title,
//         message,
//       },
//     });

//     res.status(201).json(notification);

//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// // DELETE NOTIFICATION
// export const deleteNotification = async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);

//     await prisma.notification.delete({
//       where: { id },
//     });

//     res.json({
//       message: "Notification deleted",
//     });

//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

import prisma from "../prisma/prismaClient.js";

// GET NOTIFICATIONS FOR LOGGED-IN USER
export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notifications);
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// GET UNREAD NOTIFICATION COUNT
export const getUnreadCount = async (req, res) => {
  try {
    const count = await prisma.notification.count({
      where: {
        userId: req.user.id,
        isRead: false,
      },
    });

    res.json({
      count,
    });
  } catch (error) {
    console.error("GET UNREAD COUNT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch unread notifications",
      error: error.message,
    });
  }
};

// CREATE NOTIFICATION
export const createNotification = async (req, res) => {
  try {
    const { title, message, type, userId } = req.body;

    if (!title || !message || !userId) {
      return res.status(400).json({
        message: "Title, message and userId are required",
      });
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type: type || "GENERAL",
        userId: Number(userId),
      },
    });

    res.status(201).json({
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);

    res.status(500).json({
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

// MARK ONE NOTIFICATION AS READ
export const markAsRead = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });

    res.json({
      message: "Notification marked as read",
      notification: updatedNotification,
    });
  } catch (error) {
    console.error("MARK AS READ ERROR:", error);

    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// MARK ALL NOTIFICATIONS AS READ
export const markAllAsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: {
        userId: req.user.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("MARK ALL AS READ ERROR:", error);

    res.status(500).json({
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

// DELETE NOTIFICATION
export const deleteNotification = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    await prisma.notification.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("DELETE NOTIFICATION ERROR:", error);

    res.status(500).json({
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};