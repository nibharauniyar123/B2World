

// import prisma from "../config/prisma.js";

// /* =====================================================
//    SUPER ADMIN DASHBOARD
// ===================================================== */

// // export const getSuperAdminDashboard = async (req, res) => {
// //   try {
// //     const [
// //       societies,
// //       subscriptions,
// //       activityLogs,
// //       totalUsers,
// //       revenueResult,
// //     ] = await Promise.all([
// //       // All societies
// //       prisma.society.findMany({
// //         orderBy: {
// //           createdAt: "desc",
// //         },

// //         include: {
// //           subscriptions: true,

// //           _count: {
// //             select: {
// //               users: true,
// //               flats: true,
// //               complaints: true,
// //             },
// //           },
// //         },
// //       }),

// //       // All subscriptions
// //       prisma.subscription.findMany({
// //         orderBy: {
// //           endDate: "desc",
// //         },

// //         include: {
// //           society: true,
// //         },
// //       }),

// //       // Recent activity logs
// //       prisma.activityLog.findMany({
// //         orderBy: {
// //           createdAt: "desc",
// //         },

// //         take: 10,
// //       }),

// //       // Total users
// //       prisma.user.count(),

// //       // Total subscription revenue
// //       prisma.subscription.aggregate({
// //         _sum: {
// //           price: true,
// //         },
// //       }),
// //     ]);

// //     const now = new Date();

// //     /* -----------------------------
// //        SUBSCRIPTION ANALYTICS
// //     ----------------------------- */

// //     const activeSubscriptions = subscriptions.filter(
// //       (subscription) =>
// //         new Date(subscription.endDate) >= now
// //     ).length;

// //     const basicPlans = subscriptions.filter(
// //       (subscription) =>
// //         String(subscription.plan).toUpperCase() === "BASIC"
// //     ).length;

// //     const premiumPlans = subscriptions.filter(
// //       (subscription) =>
// //         String(subscription.plan).toUpperCase() === "PREMIUM"
// //     ).length;

// //     /* -----------------------------
// //        SOCIETY DATA
// //     ----------------------------- */

// //     const societyData = societies.map((society) => {
// //       // Prisma schema says subscriptions is a single object
// //       const subscription = society.subscriptions || null;

// //       let subscriptionStatus = "NO_SUBSCRIPTION";

// //       if (subscription) {
// //         subscriptionStatus =
// //           new Date(subscription.endDate) >= now
// //             ? "ACTIVE"
// //             : "EXPIRED";
// //       }

// //       return {
// //         id: society.id,
// //         name: society.name,
// //         address: society.address,
// //         city: society.city,

// //         userCount: society._count?.users || 0,
// //         flatCount: society._count?.flats || 0,
// //         complaintCount: society._count?.complaints || 0,

// //         plan: subscription?.plan || "BASIC",

// //         subscriptionStatus,
// //       };
// //     });

// //     /* -----------------------------
// //        RESPONSE
// //     ----------------------------- */

// //     res.json({
// //       stats: {
// //         totalSocieties: societies.length,
// //         totalUsers,

// //         totalRevenue:
// //           revenueResult._sum.price || 0,

// //         activeSubscriptions,

// //         basicPlans,

// //         premiumPlans,
// //       },

// //       societies: societyData,

// //       subscriptions,

// //       activityLogs,
// //     });

// //   } catch (error) {
// //     console.error(
// //       "SUPER ADMIN DASHBOARD ERROR:",
// //       error
// //     );

// //     res.status(500).json({
// //       message: "Failed to fetch Super Admin dashboard",
// //       error: error.message,
// //     });
// //   }
// // };

// /* =====================================================
//    SUPER ADMIN DASHBOARD
// ===================================================== */

// export const getSuperAdminDashboard = async (req, res) => {
//   try {
//     const now = new Date();

//     const [
//       societies,
//       subscriptions,
//       activityLogs,
//       totalUsers,
//       revenueResult,
//       activeSubscriptions,
//       basicPlans,
//       premiumPlans,
//     ] = await Promise.all([

//       // =========================
//       // ALL SOCIETIES
//       // =========================
//       prisma.society.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },

//         include: {
//           subscriptions: true,

//           _count: {
//             select: {
//               users: true,
//               flats: true,
//               complaints: true,
//             },
//           },
//         },
//       }),

//       // =========================
//       // ALL SUBSCRIPTIONS
//       // =========================
//       prisma.subscription.findMany({
//         orderBy: {
//           endDate: "desc",
//         },

//         include: {
//           society: true,
//         },
//       }),

//       // =========================
//       // RECENT ACTIVITY LOGS
//       // =========================
//       prisma.activityLog.findMany({
//         orderBy: {
//           createdAt: "desc",
//         },

//         take: 10,
//       }),

//       // =========================
//       // TOTAL USERS
//       // =========================
//       prisma.user.count(),

//       // =========================
//       // TOTAL REVENUE
//       // =========================
//       prisma.subscription.aggregate({
//         _sum: {
//           price: true,
//         },
//       }),

//       // =========================
//       // ACTIVE SUBSCRIPTIONS
//       // =========================
//       prisma.subscription.count({
//         where: {
//           startDate: {
//             lte: now,
//           },

//           endDate: {
//             gte: now,
//           },
//         },
//       }),

//       // =========================
//       // BASIC SUBSCRIPTIONS
//       // =========================
//       prisma.subscription.count({
//         where: {
//           plan: "BASIC",
//         },
//       }),

//       // =========================
//       // PREMIUM SUBSCRIPTIONS
//       // =========================
//       prisma.subscription.count({
//         where: {
//           plan: "PREMIUM",
//         },
//       }),
//     ]);


//     // =========================
//     // SOCIETY DATA
//     // =========================

//     const societyData = societies.map((society) => {

//       // Subscription is SINGLE object
//       // because schema has societyId @unique
//       const subscription = society.subscriptions || null;

//       let subscriptionStatus = "NO_SUBSCRIPTION";

//       if (subscription) {
//         const startDate = new Date(subscription.startDate);
//         const endDate = new Date(subscription.endDate);

//         if (
//           startDate <= now &&
//           endDate >= now
//         ) {
//           subscriptionStatus = "ACTIVE";
//         } else if (endDate < now) {
//           subscriptionStatus = "EXPIRED";
//         } else {
//           subscriptionStatus = "UPCOMING";
//         }
//       }

//       return {
//         id: society.id,
//         name: society.name,
//         address: society.address,
//         city: society.city,

//         userCount: society._count?.users || 0,

//         flatCount: society._count?.flats || 0,

//         complaintCount:
//           society._count?.complaints || 0,

//         plan: subscription?.plan || "BASIC",

//         subscriptionStatus,
//       };
//     });


//     // =========================
//     // RESPONSE
//     // =========================

//     res.status(200).json({

//       stats: {
//         totalSocieties: societies.length,

//         totalUsers,

//         totalRevenue:
//           revenueResult._sum.price || 0,

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
//       message:
//         "Failed to fetch Super Admin dashboard",

//       error: error.message,
//     });
//   }
// };
// /* =====================================================
//    GET ALL SOCIETIES
// ===================================================== */

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
//     console.error(
//       "GET SOCIETIES ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to fetch societies",
//       error: error.message,
//     });
//   }
// };


// /* =====================================================
//    CREATE SOCIETY
// ===================================================== */

// export const createSociety = async (req, res) => {
//   try {
//     const {
//       name,
//       address,
//       city,
//     } = req.body;

//     if (!name || !address || !city) {
//       return res.status(400).json({
//         message:
//           "Name, address and city are required",
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
//     console.error(
//       "CREATE SOCIETY ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to create society",
//       error: error.message,
//     });
//   }
// };


// /* =====================================================
//    UPDATE SOCIETY
// ===================================================== */

// export const updateSociety = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     if (!id || Number.isNaN(id)) {
//       return res.status(400).json({
//         message: "Invalid society ID",
//       });
//     }

//     const {
//       name,
//       address,
//       city,
//     } = req.body;

//     if (!name || !address || !city) {
//       return res.status(400).json({
//         message:
//           "Name, address and city are required",
//       });
//     }

//     const existingSociety =
//       await prisma.society.findUnique({
//         where: {
//           id,
//         },
//       });

//     if (!existingSociety) {
//       return res.status(404).json({
//         message: "Society not found",
//       });
//     }

//     const society =
//       await prisma.society.update({
//         where: {
//           id,
//         },

//         data: {
//           name,
//           address,
//           city,
//         },
//       });

//     res.json({
//       message: "Society updated successfully",
//       society,
//     });

//   } catch (error) {
//     console.error(
//       "UPDATE SOCIETY ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to update society",
//       error: error.message,
//     });
//   }
// };


// /* =====================================================
//    DELETE SOCIETY
// ===================================================== */

// export const deleteSociety = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     if (!id || Number.isNaN(id)) {
//       return res.status(400).json({
//         message: "Invalid society ID",
//       });
//     }

//     const society =
//       await prisma.society.findUnique({
//         where: {
//           id,
//         },

//         include: {
//           _count: {
//             select: {
//               users: true,
//               flats: true,
//               complaints: true,
//               payments: true,
//               expenses: true,
//               notices: true,
//             },
//           },
//         },
//       });

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
//     console.error(
//       "DELETE SOCIETY ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to delete society",
//       error: error.message,
//     });
//   }
// };
// // =====================================
// // GET ALL SUBSCRIPTIONS
// // =====================================

// export const getAllSubscriptions = async (req, res) => {
//   try {

//     const subscriptions =
//       await prisma.subscription.findMany({
//         orderBy: {
//           endDate: "desc",
//         },

//         include: {
//           society: true,
//         },
//       });

//     res.json(subscriptions);

//   } catch (error) {

//     console.error(
//       "GET SUBSCRIPTIONS ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to fetch subscriptions",
//       error: error.message,
//     });
//   }
// };


// // =====================================
// // CREATE SUBSCRIPTION
// // =====================================

// export const createSubscription = async (req, res) => {
//   try {

//     const {
//       plan,
//       price,
//       startDate,
//       endDate,
//       societyId,
//     } = req.body;


//     if (
//       !plan ||
//       price === undefined ||
//       !startDate ||
//       !endDate ||
//       !societyId
//     ) {
//       return res.status(400).json({
//         message:
//           "Plan, price, start date, end date and society are required",
//       });
//     }


//     const society =
//       await prisma.society.findUnique({
//         where: {
//           id: Number(societyId),
//         },
//       });


//     if (!society) {
//       return res.status(404).json({
//         message: "Society not found",
//       });
//     }


//     const existing =
//       await prisma.subscription.findUnique({
//         where: {
//           societyId: Number(societyId),
//         },
//       });


//     if (existing) {
//       return res.status(400).json({
//         message:
//           "This society already has a subscription",
//       });
//     }


//     const subscription =
//       await prisma.subscription.create({
//         data: {
//           plan: String(plan).toUpperCase(),
//           price: Number(price),
//           startDate: new Date(startDate),
//           endDate: new Date(endDate),
//           societyId: Number(societyId),
//         },

//         include: {
//           society: true,
//         },
//       });


//     res.status(201).json({
//       message: "Subscription created successfully",
//       subscription,
//     });

//   } catch (error) {

//     console.error(
//       "CREATE SUBSCRIPTION ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to create subscription",
//       error: error.message,
//     });
//   }
// };


// // =====================================
// // UPDATE SUBSCRIPTION
// // =====================================

// export const updateSubscription = async (req, res) => {
//   try {

//     const id = Number(req.params.id);

//     const {
//       plan,
//       price,
//       startDate,
//       endDate,
//     } = req.body;


//     const subscription =
//       await prisma.subscription.update({
//         where: {
//           id,
//         },

//         data: {
//           plan: String(plan).toUpperCase(),
//           price: Number(price),
//           startDate: new Date(startDate),
//           endDate: new Date(endDate),
//         },

//         include: {
//           society: true,
//         },
//       });


//     res.json({
//       message:
//         "Subscription updated successfully",
//       subscription,
//     });

//   } catch (error) {

//     console.error(
//       "UPDATE SUBSCRIPTION ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to update subscription",
//       error: error.message,
//     });
//   }
// };


// // =====================================
// // DELETE SUBSCRIPTION
// // =====================================

// export const deleteSubscription = async (req, res) => {
//   try {

//     const id = Number(req.params.id);

//     await prisma.subscription.delete({
//       where: {
//         id,
//       },
//     });


//     res.json({
//       message:
//         "Subscription deleted successfully",
//     });

//   } catch (error) {

//     console.error(
//       "DELETE SUBSCRIPTION ERROR:",
//       error
//     );

//     res.status(500).json({
//       message: "Failed to delete subscription",
//       error: error.message,
//     });
//   }
// };
// // =====================================
// // GET ALL ACTIVITY LOGS
// // =====================================

// export const getAllActivityLogs = async (
//   req,
//   res
// ) => {

//   try {

//     const logs =
//       await prisma.activityLog.findMany({

//         orderBy: {
//           createdAt: "desc",
//         },

//       });


//     res.json(logs);

//   } catch (error) {

//     console.error(
//       "GET ACTIVITY LOGS ERROR:",
//       error
//     );

//     res.status(500).json({
//       message:
//         "Failed to fetch activity logs",
//       error: error.message,
//     });
//   }
// };

import prisma from "../config/prisma.js";

/* =====================================================
   ACTIVITY LOG HELPER
===================================================== */

const createActivityLog = async (req, action) => {
  try {
    // ActivityLog.userId is required in Prisma schema
    if (!req.user?.id) {
      console.error(
        "ACTIVITY LOG ERROR: Logged-in user not found"
      );
      return;
    }

    await prisma.activityLog.create({
      data: {
        action,
        userId: req.user.id,
        userName:
          req.user.name ||
          req.user.email ||
          "Unknown User",
      },
    });
  } catch (error) {
    // Activity log failure should not break the main operation
    console.error(
      "CREATE ACTIVITY LOG ERROR:",
      error
    );
  }
};


/* =====================================================
   SUPER ADMIN DASHBOARD
===================================================== */

export const getSuperAdminDashboard = async (req, res) => {
  try {
    const now = new Date();

    const [
      societies,
      subscriptions,
      activityLogs,
      totalUsers,
      revenueResult,
      activeSubscriptions,
      basicPlans,
      premiumPlans,
    ] = await Promise.all([

      /* =========================
         ALL SOCIETIES
      ========================= */

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


      /* =========================
         ALL SUBSCRIPTIONS
      ========================= */

      prisma.subscription.findMany({
        orderBy: {
          endDate: "desc",
        },

        include: {
          society: true,
        },
      }),


      /* =========================
         RECENT ACTIVITY LOGS
      ========================= */

      prisma.activityLog.findMany({
        orderBy: {
          createdAt: "desc",
        },

        take: 10,
      }),


      /* =========================
         TOTAL USERS
      ========================= */

      prisma.user.count(),


      /* =========================
         TOTAL REVENUE
      ========================= */

      prisma.subscription.aggregate({
        _sum: {
          price: true,
        },
      }),


      /* =========================
         ACTIVE SUBSCRIPTIONS
      ========================= */

      prisma.subscription.count({
        where: {
          startDate: {
            lte: now,
          },

          endDate: {
            gte: now,
          },
        },
      }),


      /* =========================
         BASIC SUBSCRIPTIONS
      ========================= */

      prisma.subscription.count({
        where: {
          plan: "BASIC",
        },
      }),


      /* =========================
         PREMIUM SUBSCRIPTIONS
      ========================= */

      prisma.subscription.count({
        where: {
          plan: "PREMIUM",
        },
      }),
    ]);


    /* =================================================
       SOCIETY DATA
    ================================================= */

    const societyData = societies.map((society) => {

      // Subscription is a SINGLE object
      // because societyId is @unique
      const subscription =
        society.subscriptions || null;


      let subscriptionStatus =
        "NO_SUBSCRIPTION";


      if (subscription) {

        const startDate =
          new Date(subscription.startDate);

        const endDate =
          new Date(subscription.endDate);


        if (
          startDate <= now &&
          endDate >= now
        ) {
          subscriptionStatus = "ACTIVE";

        } else if (endDate < now) {

          subscriptionStatus = "EXPIRED";

        } else {

          subscriptionStatus = "UPCOMING";
        }
      }


      return {
        id: society.id,

        name: society.name,

        address: society.address,

        city: society.city,

        userCount:
          society._count?.users || 0,

        flatCount:
          society._count?.flats || 0,

        complaintCount:
          society._count?.complaints || 0,

        plan:
          subscription?.plan || "BASIC",

        subscriptionStatus,
      };
    });


    /* =================================================
       RESPONSE
    ================================================= */

    res.status(200).json({

      stats: {

        totalSocieties:
          societies.length,

        totalUsers,

        totalRevenue:
          revenueResult._sum.price || 0,

        activeSubscriptions,

        basicPlans,

        premiumPlans,
      },


      societies:
        societyData,


      subscriptions,


      activityLogs,
    });


  } catch (error) {

    console.error(
      "SUPER ADMIN DASHBOARD ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to fetch Super Admin dashboard",

      error: error.message,
    });
  }
};


/* =====================================================
   GET ALL SOCIETIES
===================================================== */

export const getAllSocieties = async (
  req,
  res
) => {

  try {

    const societies =
      await prisma.society.findMany({

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

      message:
        "Failed to fetch societies",

      error: error.message,
    });
  }
};


/* =====================================================
   CREATE SOCIETY
===================================================== */

export const createSociety = async (
  req,
  res
) => {

  try {

    const {
      name,
      address,
      city,
    } = req.body;


    if (
      !name ||
      !address ||
      !city
    ) {

      return res.status(400).json({

        message:
          "Name, address and city are required",
      });
    }


    const society =
      await prisma.society.create({

        data: {
          name,
          address,
          city,
        },
      });


    /* =========================
       ACTIVITY LOG
    ========================= */

    await createActivityLog(
      req,
      `Created society: ${society.name}`
    );


    res.status(201).json({

      message:
        "Society created successfully",

      society,
    });


  } catch (error) {

    console.error(
      "CREATE SOCIETY ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to create society",

      error: error.message,
    });
  }
};


/* =====================================================
   UPDATE SOCIETY
===================================================== */

export const updateSociety = async (
  req,
  res
) => {

  try {

    const id =
      Number(req.params.id);


    if (
      !id ||
      Number.isNaN(id)
    ) {

      return res.status(400).json({

        message:
          "Invalid society ID",
      });
    }


    const {
      name,
      address,
      city,
    } = req.body;


    if (
      !name ||
      !address ||
      !city
    ) {

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

        message:
          "Society not found",
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


    /* =========================
       ACTIVITY LOG
    ========================= */

    await createActivityLog(
      req,
      `Updated society: ${society.name}`
    );


    res.json({

      message:
        "Society updated successfully",

      society,
    });


  } catch (error) {

    console.error(
      "UPDATE SOCIETY ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to update society",

      error: error.message,
    });
  }
};


/* =====================================================
   DELETE SOCIETY
===================================================== */

export const deleteSociety = async (
  req,
  res
) => {

  try {

    const id =
      Number(req.params.id);


    if (
      !id ||
      Number.isNaN(id)
    ) {

      return res.status(400).json({

        message:
          "Invalid society ID",
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

          subscriptions: true,
        },
      });


    if (!society) {

      return res.status(404).json({

        message:
          "Society not found",
      });
    }


    /* =========================
       CHECK EXISTING DATA
    ========================= */

    const hasData =
      society._count.users > 0 ||
      society._count.flats > 0 ||
      society._count.complaints > 0 ||
      society._count.payments > 0 ||
      society._count.expenses > 0 ||
      society._count.notices > 0 ||
      society.subscriptions !== null;


    if (hasData) {

      return res.status(400).json({

        message:
          "Society cannot be deleted because it contains existing data",
      });
    }


    const societyName =
      society.name;


    await prisma.society.delete({

      where: {
        id,
      },
    });


    /* =========================
       ACTIVITY LOG
    ========================= */

    await createActivityLog(
      req,
      `Deleted society: ${societyName}`
    );


    res.json({

      message:
        "Society deleted successfully",
    });


  } catch (error) {

    console.error(
      "DELETE SOCIETY ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to delete society",

      error: error.message,
    });
  }
};


/* =====================================================
   GET ALL SUBSCRIPTIONS
===================================================== */

export const getAllSubscriptions = async (
  req,
  res
) => {

  try {

    const subscriptions =
      await prisma.subscription.findMany({

        orderBy: {
          endDate: "desc",
        },

        include: {
          society: true,
        },
      });


    res.json(subscriptions);


  } catch (error) {

    console.error(
      "GET SUBSCRIPTIONS ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to fetch subscriptions",

      error: error.message,
    });
  }
};


/* =====================================================
   CREATE SUBSCRIPTION
===================================================== */

export const createSubscription = async (
  req,
  res
) => {

  try {

    const {
      plan,
      price,
      startDate,
      endDate,
      societyId,
    } = req.body;


    if (
      !plan ||
      price === undefined ||
      !startDate ||
      !endDate ||
      !societyId
    ) {

      return res.status(400).json({

        message:
          "Plan, price, start date, end date and society are required",
      });
    }


    const society =
      await prisma.society.findUnique({

        where: {
          id: Number(societyId),
        },
      });


    if (!society) {

      return res.status(404).json({

        message:
          "Society not found",
      });
    }


    const existing =
      await prisma.subscription.findUnique({

        where: {
          societyId:
            Number(societyId),
        },
      });


    if (existing) {

      return res.status(400).json({

        message:
          "This society already has a subscription",
      });
    }


    const subscription =
      await prisma.subscription.create({

        data: {

          plan:
            String(plan).toUpperCase(),

          price:
            Number(price),

          startDate:
            new Date(startDate),

          endDate:
            new Date(endDate),

          societyId:
            Number(societyId),
        },

        include: {
          society: true,
        },
      });


    /* =========================
       ACTIVITY LOG
    ========================= */

    await createActivityLog(
      req,
      `Created ${subscription.plan} subscription for ${subscription.society.name}`
    );


    res.status(201).json({

      message:
        "Subscription created successfully",

      subscription,
    });


  } catch (error) {

    console.error(
      "CREATE SUBSCRIPTION ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to create subscription",

      error: error.message,
    });
  }
};


/* =====================================================
   UPDATE SUBSCRIPTION
===================================================== */

export const updateSubscription = async (
  req,
  res
) => {

  try {

    const id =
      Number(req.params.id);


    if (
      !id ||
      Number.isNaN(id)
    ) {

      return res.status(400).json({

        message:
          "Invalid subscription ID",
      });
    }


    const {
      plan,
      price,
      startDate,
      endDate,
    } = req.body;


    if (
      !plan ||
      price === undefined ||
      !startDate ||
      !endDate
    ) {

      return res.status(400).json({

        message:
          "Plan, price, start date and end date are required",
      });
    }


    const subscription =
      await prisma.subscription.update({

        where: {
          id,
        },

        data: {

          plan:
            String(plan).toUpperCase(),

          price:
            Number(price),

          startDate:
            new Date(startDate),

          endDate:
            new Date(endDate),
        },

        include: {
          society: true,
        },
      });


    /* =========================
       ACTIVITY LOG
    ========================= */

    await createActivityLog(
      req,
      `Updated ${subscription.plan} subscription for ${subscription.society.name}`
    );


    res.json({

      message:
        "Subscription updated successfully",

      subscription,
    });


  } catch (error) {

    console.error(
      "UPDATE SUBSCRIPTION ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to update subscription",

      error: error.message,
    });
  }
};


/* =====================================================
   DELETE SUBSCRIPTION
===================================================== */

export const deleteSubscription = async (
  req,
  res
) => {

  try {

    const id =
      Number(req.params.id);


    if (
      !id ||
      Number.isNaN(id)
    ) {

      return res.status(400).json({

        message:
          "Invalid subscription ID",
      });
    }


    /* =========================
       GET BEFORE DELETE
    ========================= */

    const existing =
      await prisma.subscription.findUnique({

        where: {
          id,
        },

        include: {
          society: true,
        },
      });


    if (!existing) {

      return res.status(404).json({

        message:
          "Subscription not found",
      });
    }


    const plan =
      existing.plan;

    const societyName =
      existing.society.name;


    await prisma.subscription.delete({

      where: {
        id,
      },
    });


    /* =========================
       ACTIVITY LOG
    ========================= */

    await createActivityLog(
      req,
      `Deleted ${plan} subscription for ${societyName}`
    );


    res.json({

      message:
        "Subscription deleted successfully",
    });


  } catch (error) {

    console.error(
      "DELETE SUBSCRIPTION ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to delete subscription",

      error: error.message,
    });
  }
};


/* =====================================================
   GET ALL ACTIVITY LOGS
===================================================== */

export const getAllActivityLogs = async (
  req,
  res
) => {

  try {

    const logs =
      await prisma.activityLog.findMany({

        orderBy: {
          createdAt: "desc",
        },
      });


    res.json(logs);


  } catch (error) {

    console.error(
      "GET ACTIVITY LOGS ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to fetch activity logs",

      error: error.message,
    });
  }
};


/* =====================================================
   GET ACTIVITY LOG STATS
===================================================== */

export const getActivityLogStats = async (
  req,
  res
) => {

  try {

    const totalLogs =
      await prisma.activityLog.count();


    const todayStart =
      new Date();

    todayStart.setHours(
      0,
      0,
      0,
      0
    );


    const todayLogs =
      await prisma.activityLog.count({

        where: {
          createdAt: {
            gte: todayStart,
          },
        },
      });


    res.json({

      totalLogs,

      todayLogs,
    });


  } catch (error) {

    console.error(
      "ACTIVITY LOG STATS ERROR:",
      error
    );


    res.status(500).json({

      message:
        "Failed to fetch activity log stats",

      error: error.message,
    });
  }
};