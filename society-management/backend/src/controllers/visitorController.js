
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// =====================================================
// GET ALL VISITORS
// =====================================================

export const getVisitors = async (req, res) => {
  try {

    // const visitors = await prisma.visitor.findMany({
    //     where: {
    //     societyId: req.user.societyId,
    //   },
    const visitors = await prisma.visitor.findMany({
  where: {
    societyId: req.user.societyId,

    ...(req.user.role === "RESIDENT"
      ? {
          residentId: req.user.id,
        }
      : {}),
  },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(
      "ADMIN SOCIETY ID:",
      req.user.societyId
    );
  console.log(
  "TOTAL VISITORS FROM DATABASE:",
  visitors.length
);

console.log(
  "VISITORS DATA:",
  visitors
);
   
   

    res.json(visitors);

  } catch (error) {

    console.error("GET VISITORS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
};


// =====================================================
// CREATE VISITOR
// =====================================================

export const createVisitor = async (req, res) => {
  try {

    console.log("========== CREATE VISITOR ==========");
    console.log(req.body);

    const {
      name,
      phone,
      purpose,
      residentId,
      // societyId,
      visitorType,
      visitDate,
      expectedTime,
      vehicleType,
      vehicleNumber,
      deliveryType,
      deliveryCompany,
    } = req.body;


    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!name || !phone) {
      return res.status(400).json({
        message: "Visitor name and phone are required",
      });
    }

    // ==========================================
// VERIFY RESIDENT SOCIETY
// ==========================================

if (residentId) {

  const resident = await prisma.user.findUnique({
    where: {
      id: Number(residentId),
    },
    select: {
      id: true,
      name: true,
      role: true,
      societyId: true,
    },
  });

  if (!resident) {
    return res.status(404).json({
      message: "Resident not found",
    });
  }

  if (resident.role !== "RESIDENT") {
    return res.status(400).json({
      message: "Selected user is not a resident",
    });
  }

  if (
    Number(resident.societyId) !==
    Number(req.user.societyId)
  ) {
    return res.status(403).json({
      message:
        "Resident does not belong to your society",
    });
  }
}


    // -----------------------------
    // QR GENERATION
    // -----------------------------

    const qrCode = `VISITOR-${Date.now()}`;

    const qrToken =
      `QR-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;


    // -----------------------------
    // CREATE
    // -----------------------------

    const visitor = await prisma.visitor.create({
      // data: {

      //   name: name.trim(),

      //   phone: phone.trim(),

      //   purpose:
      //     purpose?.trim() || null,

      //   residentId:
      //     residentId
      //       ? Number(residentId)
      //       : null,

      //   // societyId:
      //   //   societyId
      //   //     ? Number(societyId)
      //   //     : null,
      //   societyId: req.user.societyId,
      data: {
  name: name.trim(),
  phone: phone.trim(),
  purpose: purpose?.trim() || null,

  // Resident cannot choose another resident
  residentId:
    req.user.role === "RESIDENT"
      ? req.user.id
      : residentId
        ? Number(residentId)
        : null,

  // Society always comes from logged-in user
  societyId: req.user.societyId,

        visitorType:
          visitorType || null,

        visitDate:
          visitDate
            ? new Date(visitDate)
            : null,

        expectedTime:
          expectedTime || null,

        vehicleType:
          vehicleType || null,

        vehicleNumber:
          vehicleNumber?.trim() || null,

        deliveryType:
          deliveryType || null,

        deliveryCompany:
          deliveryCompany?.trim() || null,

        qrCode,

        qrToken,

        // status: "PENDING",
        status:
  req.user.role === "RESIDENT"
    ? "APPROVED"
    : "PENDING",

    approvedAt:
  req.user.role === "RESIDENT"
    ? new Date()
    : null,
      },
    });

// Create notification for resident
// if (visitor.residentId) {
//   await prisma.notification.create({
//     data: {
//       title: "New Visitor",
//       message: `${visitor.name} is waiting for your approval.`,
//       type: "VISITOR",
//       userId: visitor.residentId,
//     },
//   });
// }

if (visitor.residentId) {
  const notification = await prisma.notification.create({
    data: {
      title: "New Visitor",
      message: `${visitor.name} is waiting for your approval.`,
      type: "VISITOR",
      userId: visitor.residentId,
    },
  });

  console.log("🔔 NOTIFICATION CREATED:", notification);
}
    console.log("VISITOR CREATED:", visitor);

    res.status(201).json({
      message: "Visitor created successfully",
      visitor,
    });

  } catch (error) {

    console.error(
      "CREATE VISITOR ERROR:",
      error
    );

    res.status(500).json({
      message: "Visitor create failed",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE STATUS
// =====================================================

export const updateVisitorStatus = async (req, res) => {
  try {

    const id = Number(req.params.id);

    const { status } = req.body;


    const allowedStatuses = [
      "PENDING",
      "APPROVED",
      "REJECTED",
      "CHECKED_IN",
      "CHECKED_OUT",
    ];


    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({
        message: "Invalid visitor status",
      });

    }


    const existingVisitor =
      await prisma.visitor.findUnique({
        where: { id },
      });


    if (!existingVisitor) {

      return res.status(404).json({
        message: "Visitor not found",
      });

    }


    const visitor =
      await prisma.visitor.update({

        where: { id },

        data: {

          status,

          ...(status === "APPROVED" && {
            approvedAt: new Date(),
          }),

          ...(status === "CHECKED_IN" && {
            checkIn: new Date(),
          }),

          ...(status === "CHECKED_OUT" && {
            checkOut: new Date(),
          }),

        },

      });


    res.json({

      message:
        "Visitor status updated successfully",

      visitor,

    });

  } catch (error) {

    console.error(
      "UPDATE STATUS ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Failed to update visitor status",

      error:
        error.message,

    });

  }
};

// =====================================================
// SCAN QR AND CHECK IN VISITOR
// =====================================================

export const scanVisitorQR = async (req, res) => {

  try {

    const { qrToken } = req.body;

    if (!qrToken) {
      return res.status(400).json({
        message: "QR token is required",
      });
    }

    // Find visitor using QR token
    const visitor =
      await prisma.visitor.findFirst({
        where: {
          qrToken: qrToken,
          societyId: req.user.societyId,
        },
      });

    if (!visitor) {
      return res.status(404).json({
        message:
          "Visitor not found or visitor belongs to another society",
      });
    }

    // Visitor must be approved
    if (visitor.status !== "APPROVED") {

      return res.status(400).json({
        message:
          `Visitor cannot check in. Current status: ${visitor.status}`,
      });

    }

    // Check in visitor
    const updatedVisitor =
      await prisma.visitor.update({
        where: {
          id: visitor.id,
        },

        data: {
          status: "CHECKED_IN",
          checkIn: new Date(),
        },
      });

    return res.json({
      message:
        "Visitor checked in successfully",
      visitor: updatedVisitor,
    });

  } catch (error) {

    console.error(
      "SCAN VISITOR QR ERROR:",
      error
    );

    return res.status(500).json({
      message:
        "QR scan check-in failed",
      error: error.message,
    });

  }
};
// =====================================================
// CHECK IN
// =====================================================

export const checkInVisitor = async (req, res) => {

  try {

    const id = Number(req.params.id);


    const visitor =
      await prisma.visitor.findUnique({
        where: { id },
      });


    if (!visitor) {

      return res.status(404).json({
        message: "Visitor not found",
      });

    }


    if (visitor.status !== "APPROVED") {

      return res.status(400).json({
        message:
          "Only approved visitors can check in",
      });

    }


    const updatedVisitor =
      await prisma.visitor.update({

        where: { id },

        data: {

          status: "CHECKED_IN",

          checkIn: new Date(),

        },

      });


    res.json({

      message:
        "Visitor checked in successfully",

      visitor:
        updatedVisitor,

    });

  } catch (error) {

    console.error(
      "CHECK IN ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Visitor check-in failed",

      error:
        error.message,

    });

  }
};


// =====================================================
// CHECK OUT
// =====================================================

export const checkOutVisitor = async (req, res) => {

  try {

    const id = Number(req.params.id);


    const visitor =
      await prisma.visitor.findUnique({
        where: { id },
      });


    if (!visitor) {

      return res.status(404).json({
        message: "Visitor not found",
      });

    }


    if (visitor.status !== "CHECKED_IN") {

      return res.status(400).json({
        message:
          "Visitor is not currently checked in",
      });

    }


    const updatedVisitor =
      await prisma.visitor.update({

        where: { id },

        data: {

          status: "CHECKED_OUT",

          checkOut: new Date(),

        },

      });


    res.json({

      message:
        "Visitor checked out successfully",

      visitor:
        updatedVisitor,

    });

  } catch (error) {

    console.error(
      "CHECK OUT ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Visitor check-out failed",

      error:
        error.message,

    });

  }
};


// =====================================================
// DELETE
// =====================================================

export const deleteVisitor = async (req, res) => {

  try {

    const id =
      Number(req.params.id);


    const visitor =
      await prisma.visitor.findUnique({
        where: { id },
      });


    if (!visitor) {

      return res.status(404).json({
        message: "Visitor not found",
      });

    }


    await prisma.visitor.delete({
      where: { id },
    });


    res.json({

      message:
        "Visitor deleted successfully",

    });

  } catch (error) {

    console.error(
      "DELETE VISITOR ERROR:",
      error
    );

    res.status(500).json({

      message:
        "Failed to delete visitor",

      error:
        error.message,

    });

  }
};