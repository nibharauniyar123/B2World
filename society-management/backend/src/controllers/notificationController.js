import prisma from "../prisma/prismaClient.js";

// GET ALL NOTIFICATIONS
export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.json(notifications);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// CREATE NOTIFICATION
export const createNotification = async (req, res) => {
  try {
    const { title, message } = req.body;

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
      },
    });

    res.status(201).json(notification);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// DELETE NOTIFICATION
export const deleteNotification = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.notification.delete({
      where: { id },
    });

    res.json({
      message: "Notification deleted",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};