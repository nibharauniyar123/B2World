import prisma from "../prisma/prismaClient.js";

export const getDashboard = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const societies = await prisma.society.count();
    const complaints = await prisma.complaint.count();

    res.json({
      users,
      societies,
      complaints
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};