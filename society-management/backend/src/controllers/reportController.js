import prisma from "../prisma/prismaClient.js";

export const getReports = async (req, res) => {
  try {
    const users = await prisma.user.count();

    const complaints = await prisma.complaint.count();

    const bookings = await prisma.booking.count();

    const maintenance = await prisma.maintenance.count();

    res.json({
      users,
      complaints,
      bookings,
      maintenance,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};