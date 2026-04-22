import prisma from "../prisma/prismaClient.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const societies = await prisma.society.count();
    const complaints = await prisma.complaint.count();

    const pending = await prisma.complaint.count({
      where: { status: "pending" },
    });

    res.json({
      users,
      societies,
      complaints,
      pending,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};