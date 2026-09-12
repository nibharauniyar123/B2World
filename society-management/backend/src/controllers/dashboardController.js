
// import prisma from "../prisma/prismaClient.js";

// export const getDashboardStats = async (req, res) => {
//   try {
//     const users = await prisma.user.count();
//     const societies = await prisma.society.count();
//     const complaints = await prisma.complaint.count();
//     const visitors = await prisma.visitor.count();
//     const maintenance = await prisma.maintenance.count();
//     const bookings = await prisma.booking.count();

//     res.json({
//       users,
//       societies,
//       complaints,
//       visitors,
//       maintenance,
//       bookings,
//     });

//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
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

    // ADD HERE 👇
    const revenue = await prisma.payment.aggregate({
      _sum: {
        totalAmount: true,
      },
    });
    const recentComplaints = await prisma.complaint.findMany({
  take: 5,
  orderBy: {
    createdAt: "desc",
  },
  include: {
    society: true,
  },
});
const recentVisitors =
  await prisma.visitor.findMany({
    take: 5,

    orderBy: {
      createdAt: "desc",
    },
  });

    res.json({
      users,
      societies,
      complaints,
      visitors,
      maintenance,
      bookings,

      // ADD HERE 👇
      revenue: revenue._sum.totalAmount || 0,
      recentComplaints,
      recentVisitors,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};
