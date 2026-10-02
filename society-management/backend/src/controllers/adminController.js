
import prisma from "../prisma/prismaClient.js";

// ==========================================
// SOCIETY ADMIN DASHBOARD
// ==========================================
export const getAdminDashboard = async (req, res) => {
  try {
    // --------------------------------------
    // Check logged-in admin
    // --------------------------------------
    console.log("===== ADMIN DASHBOARD =====");
console.log("ADMIN USER:", req.user);
console.log("ADMIN SOCIETY ID:", req.user?.societyId);
    if (!req.user) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    // --------------------------------------
    // Get Admin's Society ID
    // --------------------------------------
    const societyId = req.user.societyId;

    if (!societyId) {
      return res.status(400).json({
        message: "Admin is not assigned to any society",
      });
    }

    // ======================================
    // RESIDENTS
    // ======================================
    const totalResidents = await prisma.user.count({
      where: {
        societyId: societyId,
        role: "RESIDENT",
      },
    });

    // ======================================
    // FLATS
    // ======================================
    const totalFlats = await prisma.flat.count({
      where: {
        societyId: societyId,
      },
    });

    const occupiedFlats = await prisma.flat.count({
      where: {
        societyId: societyId,
        occupancyStatus: "OCCUPIED",
      },
    });

    const vacantFlats = await prisma.flat.count({
      where: {
        societyId: societyId,
        occupancyStatus: "VACANT",
      },
    });

    // ======================================
    // OCCUPANCY PERCENTAGE
    // ======================================
    const occupancyPercentage =
      totalFlats > 0
        ? Math.round((occupiedFlats / totalFlats) * 100)
        : 0;

    // ======================================
    // COMPLAINTS
    // ======================================
    // console.log("SOCIETY ID USED FOR COMPLAINT:", societyId);
    const totalComplaints = await prisma.complaint.count({
      where: {
        societyId: societyId,
      },
    });
    // console.log("TOTAL COMPLAINTS:", totalComplaints);
    const inprogressComplaints = await prisma.complaint.count({
      where: {
        societyId: societyId,
        status: "IN_PROGRESS",
      },
    });

    const resolvedComplaints = await prisma.complaint.count({
      where: {
        societyId: societyId,
        status: "RESOLVED",
      },
    });

    const openComplaints = await prisma.complaint.count({
      where: {
        societyId: societyId,
        status: "OPEN",
      },
    });

    // ======================================
    // MAINTENANCE COLLECTION
    // ======================================
//     const maintenancePayments = await prisma.payment.aggregate({
//       _sum: {
//         totalAmount: true,
//       },
//       where: {
//         societyId: societyId,
//         status: "PAID",
//       },
//     });

//     const pendingPayments = await prisma.payment.aggregate({
//   _sum: { totalAmount: true },
//   where: {
//     societyId: societyId,
//     status: "PENDING",
//   },
// });
    
//     console.log("SOCIETY ID USED FOR MAINTENANCE:", societyId);
//     console.log("MAINTENANCE PAYMENTS:", maintenancePayments._sum.totalAmount);
//     console.log(
//   "PENDING PAYMENTS:",
//   pendingPayments._sum.totalAmount
// );
//     const maintenanceCollection =
//       maintenancePayments._sum.totalAmount || 0;

//     const pendingCollection =
//   pendingPayments._sum.totalAmount || 0;


const paidMaintenance = await prisma.maintenance.aggregate({
  _sum: {
    total: true,
  },
  where: {
    user: {
      societyId: societyId,
    },
    status: "PAID",
  },
});

const pendingMaintenance = await prisma.maintenance.aggregate({
  _sum: {
    total: true,
  },
  where: {
    user: {
      societyId: societyId,
    },
    status: "PENDING",
  },
});

console.log(
  "SOCIETY ID USED FOR MAINTENANCE:",
  societyId
);

console.log(
  "PAID MAINTENANCE:",
  paidMaintenance._sum.total
);

console.log(
  "PENDING MAINTENANCE:",
  pendingMaintenance._sum.total
);

const maintenanceCollection =
  paidMaintenance._sum.total || 0;

const pendingCollection =
  pendingMaintenance._sum.total || 0;
    // ======================================
    // RESPONSE
    // ======================================
    res.json({
      success: true,

      societyId: societyId,

      residents: {
        totalResidents,
      },

      flats: {
        totalFlats,
        occupiedFlats,
        vacantFlats,
        occupancyPercentage,
      },

      complaints: {
        totalComplaints,
        inprogressComplaints,
        resolvedComplaints,
        openComplaints,
      },

      maintenance: {
        maintenanceCollection,
        pendingCollection,
      },
      // pendingCollection:{
      //   totalPendingAmount: pendingCollection,

      // }
    });

  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
      error: error.message,
    });
  }
};
