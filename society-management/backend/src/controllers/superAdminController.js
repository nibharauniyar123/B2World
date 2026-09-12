// import prisma from "../config/prisma.js";

// export const getSuperAdminDashboard = async (req, res) => {
//   try {
//     const [
//       societies,
//       subscriptions,
//       activityLogs,
//       totalUsers,
//       revenueResult,
//     ] = await Promise.all([
//       prisma.society.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },
//         include: {
//           subscriptions: true,
//           _count: {
//             select: {
//               users: true,
//             },
//           },
//         },
//       }),

//       prisma.subscription.findMany({
//         orderBy: {
//           endDate: "desc",
//         },
//         include: {
//           society: true,
//         },
//       }),

//       prisma.activityLog.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },
//         take: 10,
//       }),

//       prisma.user.count(),

//       prisma.subscription.aggregate({
//         _sum: {
//           price: true,
//         },
//       }),
//     ]);

//     const now = new Date();

//     const activeSubscriptions = subscriptions.filter(
//       (subscription) =>
//         new Date(subscription.endDate) >= now
//     ).length;

//     const basicPlans = subscriptions.filter(
//       (subscription) =>
//         String(subscription.plan).toUpperCase() === "BASIC"
//     ).length;

//     const premiumPlans = subscriptions.filter(
//       (subscription) =>
//         String(subscription.plan).toUpperCase() === "PREMIUM"
//     ).length;

 
// export const getAllSocieties = async (req, res) => {
//   try {
//     const societies = await prisma.society.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },

//       include: {
//         _count: {
//           select: {
//             users: true,
//             flats: true,
//             complaints: true,
//           },
//         },

//         subscriptions: true,
//       },
//     });

//     res.json(societies);
//   } catch (error) {
//     console.error("GET SOCIETIES ERROR:", error);

//     res.status(500).json({
//       message: "Failed to fetch societies",
//       error: error.message,
//     });
//   }
// };
// export const createSociety = async (req, res) => {
//   try {
//     const {
//       name,
//       address,
//       city,
//     } = req.body;

//     if (!name || !address || !city) {
//       return res.status(400).json({
//         message: "Name, address and city are required",
//       });
//     }

//     const society = await prisma.society.create({
//       data: {
//         name,
//         address,
//         city,
//       },
//     });

//     res.status(201).json({
//       message: "Society created successfully",
//       society,
//     });
//   } catch (error) {
//     console.error("CREATE SOCIETY ERROR:", error);

//     res.status(500).json({
//       message: "Failed to create society",
//       error: error.message,
//     });
//   }
// };
// export const updateSociety = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const {
//       name,
//       address,
//       city,
//     } = req.body;

//     const society = await prisma.society.update({
//       where: {
//         id,
//       },

//       data: {
//         name,
//         address,
//         city,
//       },
//     });

//     res.json({
//       message: "Society updated successfully",
//       society,
//     });
//   } catch (error) {
//     console.error("UPDATE SOCIETY ERROR:", error);

//     res.status(500).json({
//       message: "Failed to update society",
//       error: error.message,
//     });
//   }
// };
// export const deleteSociety = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const society = await prisma.society.findUnique({
//       where: {
//         id,
//       },

//       include: {
//         _count: {
//           select: {
//             users: true,
//             flats: true,
//             complaints: true,
//             payments: true,
//             expenses: true,
//             notices: true,
//           },
//         },
//       },
//     });

//     if (!society) {
//       return res.status(404).json({
//         message: "Society not found",
//       });
//     }

//     const hasData =
//       society._count.users > 0 ||
//       society._count.flats > 0 ||
//       society._count.complaints > 0 ||
//       society._count.payments > 0 ||
//       society._count.expenses > 0 ||
//       society._count.notices > 0;

//     if (hasData) {
//       return res.status(400).json({
//         message:
//           "Society cannot be deleted because it contains existing data",
//       });
//     }

//     await prisma.society.delete({
//       where: {
//         id,
//       },
//     });

//     res.json({
//       message: "Society deleted successfully",
//     });
//   } catch (error) {
//     console.error("DELETE SOCIETY ERROR:", error);

//     res.status(500).json({
//       message: "Failed to delete society",
//       error: error.message,
//     });
//   }
// };
// const societyData = societies.map((society) => {
//   const subscription = society.subscriptions || null;

//   return {
//     id: society.id,
//     name: society.name,
//     city: society.city,
//     userCount: society._count?.users || 0,
//     plan: subscription?.plan || "BASIC",
//   };
// });
//     res.json({
//       stats: {
//         totalSocieties: societies.length,
//         totalUsers,
//         totalRevenue: revenueResult._sum.price || 0,
//         activeSubscriptions,
//         basicPlans,
//         premiumPlans,
//       },

//       societies: societyData,

//       subscriptions,

//       activityLogs,
//     });

//   } catch (error) {
//     console.error(
//       "SUPER ADMIN DASHBOARD ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to fetch Super Admin dashboard",
//       error: error.message,
//     });
//   }
// };

import prisma from "../config/prisma.js";

/* =====================================================
   SUPER ADMIN DASHBOARD
===================================================== */

export const getSuperAdminDashboard = async (req, res) => {
  try {
    const [
      societies,
      subscriptions,
      activityLogs,
      totalUsers,
      revenueResult,
    ] = await Promise.all([
      // All societies
      prisma.society.findMany({
        orderBy: {
          createdAt: "desc",
        },

        include: {
          subscriptions: true,

          _count: {
            select: {
              users: true,
              flats: true,
              complaints: true,
            },
          },
        },
      }),

      // All subscriptions
      prisma.subscription.findMany({
        orderBy: {
          endDate: "desc",
        },

        include: {
          society: true,
        },
      }),

      // Recent activity logs
      prisma.activityLog.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      }),

      // Total users
      prisma.user.count(),

      // Total subscription revenue
      prisma.subscription.aggregate({
        _sum: {
          price: true,
        },
      }),
    ]);

    const now = new Date();

    /* -----------------------------
       SUBSCRIPTION ANALYTICS
    ----------------------------- */

    const activeSubscriptions = subscriptions.filter(
      (subscription) =>
        new Date(subscription.endDate) >= now
    ).length;

    const basicPlans = subscriptions.filter(
      (subscription) =>
        String(subscription.plan).toUpperCase() === "BASIC"
    ).length;

    const premiumPlans = subscriptions.filter(
      (subscription) =>
        String(subscription.plan).toUpperCase() === "PREMIUM"
    ).length;

    /* -----------------------------
       SOCIETY DATA
    ----------------------------- */

    const societyData = societies.map((society) => {
      // Prisma schema says subscriptions is a single object
      const subscription = society.subscriptions || null;

      let subscriptionStatus = "NO_SUBSCRIPTION";

      if (subscription) {
        subscriptionStatus =
          new Date(subscription.endDate) >= now
            ? "ACTIVE"
            : "EXPIRED";
      }

      return {
        id: society.id,
        name: society.name,
        address: society.address,
        city: society.city,

        userCount: society._count?.users || 0,
        flatCount: society._count?.flats || 0,
        complaintCount: society._count?.complaints || 0,

        plan: subscription?.plan || "BASIC",

        subscriptionStatus,
      };
    });

    /* -----------------------------
       RESPONSE
    ----------------------------- */

    res.json({
      stats: {
        totalSocieties: societies.length,
        totalUsers,

        totalRevenue:
          revenueResult._sum.price || 0,

        activeSubscriptions,

        basicPlans,

        premiumPlans,
      },

      societies: societyData,

      subscriptions,

      activityLogs,
    });

  } catch (error) {
    console.error(
      "SUPER ADMIN DASHBOARD ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch Super Admin dashboard",
      error: error.message,
    });
  }
};


/* =====================================================
   GET ALL SOCIETIES
===================================================== */

export const getAllSocieties = async (req, res) => {
  try {
    const societies = await prisma.society.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        _count: {
          select: {
            users: true,
            flats: true,
            complaints: true,
          },
        },

        subscriptions: true,
      },
    });

    res.json(societies);

  } catch (error) {
    console.error(
      "GET SOCIETIES ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch societies",
      error: error.message,
    });
  }
};


/* =====================================================
   CREATE SOCIETY
===================================================== */

export const createSociety = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
    } = req.body;

    if (!name || !address || !city) {
      return res.status(400).json({
        message:
          "Name, address and city are required",
      });
    }

    const society = await prisma.society.create({
      data: {
        name,
        address,
        city,
      },
    });

    res.status(201).json({
      message: "Society created successfully",
      society,
    });

  } catch (error) {
    console.error(
      "CREATE SOCIETY ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to create society",
      error: error.message,
    });
  }
};


/* =====================================================
   UPDATE SOCIETY
===================================================== */

export const updateSociety = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid society ID",
      });
    }

    const {
      name,
      address,
      city,
    } = req.body;

    if (!name || !address || !city) {
      return res.status(400).json({
        message:
          "Name, address and city are required",
      });
    }

    const existingSociety =
      await prisma.society.findUnique({
        where: {
          id,
        },
      });

    if (!existingSociety) {
      return res.status(404).json({
        message: "Society not found",
      });
    }

    const society =
      await prisma.society.update({
        where: {
          id,
        },

        data: {
          name,
          address,
          city,
        },
      });

    res.json({
      message: "Society updated successfully",
      society,
    });

  } catch (error) {
    console.error(
      "UPDATE SOCIETY ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to update society",
      error: error.message,
    });
  }
};


/* =====================================================
   DELETE SOCIETY
===================================================== */

export const deleteSociety = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({
        message: "Invalid society ID",
      });
    }

    const society =
      await prisma.society.findUnique({
        where: {
          id,
        },

        include: {
          _count: {
            select: {
              users: true,
              flats: true,
              complaints: true,
              payments: true,
              expenses: true,
              notices: true,
            },
          },
        },
      });

    if (!society) {
      return res.status(404).json({
        message: "Society not found",
      });
    }

    const hasData =
      society._count.users > 0 ||
      society._count.flats > 0 ||
      society._count.complaints > 0 ||
      society._count.payments > 0 ||
      society._count.expenses > 0 ||
      society._count.notices > 0;

    if (hasData) {
      return res.status(400).json({
        message:
          "Society cannot be deleted because it contains existing data",
      });
    }

    await prisma.society.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Society deleted successfully",
    });

  } catch (error) {
    console.error(
      "DELETE SOCIETY ERROR:",
      error
    );

    res.status(500).json({
      message: "Failed to delete society",
      error: error.message,
    });
  }
};