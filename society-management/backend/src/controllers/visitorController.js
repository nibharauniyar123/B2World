
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// =====================================================
// GET ALL VISITORS
// =====================================================

export const getVisitors = async (req, res) => {
  try {

    const visitors = await prisma.visitor.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

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
      societyId,
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
      data: {

        name: name.trim(),

        phone: phone.trim(),

        purpose:
          purpose?.trim() || null,

        residentId:
          residentId
            ? Number(residentId)
            : null,

        societyId:
          societyId
            ? Number(societyId)
            : null,

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

        status: "PENDING",
      },
    });


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