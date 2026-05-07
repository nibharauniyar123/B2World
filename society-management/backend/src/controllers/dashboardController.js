// import prisma from "../prisma/prismaClient.js";

// export const getDashboard = async (req, res) => {
//   try {
//     const users = await prisma.user.count();
//     const societies = await prisma.society.count();
//     const complaints = await prisma.complaint.count();

//     res.json({
//       users,
//       societies,
//       complaints
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
import prisma from "../prisma/prismaClient.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await prisma.user.count();
    const societies = await prisma.society.count();
    const complaints = await prisma.complaint.count();
    const visitors = await prisma.visitor.count();
    const maintenance = await prisma.maintenance.count();
    const bookings = await prisma.booking.count();

    res.json({
      users,
      societies,
      complaints,
      visitors,
      maintenance,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};