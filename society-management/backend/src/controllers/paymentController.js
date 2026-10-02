
// import prisma from "../config/prisma.js";

// // export const createPayment = async (req, res) => {
// //   try {
// //     // const {
// //     //   userId,
// //     //   amount,
// //     //   waterCharge,
// //     //   electricityCharge,
// //     //   lateFee,
// //     // } = req.body;

// //     // const totalAmount =
// //     //   Number(amount) +
// //     //   Number(waterCharge) +
// //     //   Number(electricityCharge) +
// //     //   Number(lateFee);

// //     // const payment = await prisma.payment.create({
// //     //   data: {
// //     //     userId: Number(userId),
// //     //     amount: Number(amount),
// //     //     waterCharge: Number(waterCharge),
// //     //     electricityCharge: Number(electricityCharge),
// //     //     lateFee: Number(lateFee),
// //     //     totalAmount,
// //     //   },
// //     // });
// //     const {
// //   userId,
// //   amount,
// //   waterCharge,
// //   electricityCharge,
// //   lateFee,
// //   month,
// //   dueDate,
// //   societyId,
// // } = req.body;

// // const payment = await prisma.payment.create({
// //   data:{
// //     userId:Number(userId),

// //     amount:Number(amount),

// //     waterCharge:Number(waterCharge),

// //     electricityCharge:Number(electricityCharge),

// //     lateFee:Number(lateFee),

// //     totalAmount,

// //     month,

// //     dueDate:new Date(dueDate),

// //     societyId:Number(societyId),
// //   }
// // });

// //     res.status(201).json(payment);
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).json({ message: "Failed" });
// //   }
// // };
// export const createPayment = async (req, res) => {
//   try {
//     const {
//       userId,
//       societyId,
//       amount,
//       waterCharge,
//       electricityCharge,
//       lateFee,
//       month,
//       dueDate,
//     } = req.body;

//     // Calculate total amount
//     const totalAmount =
//       Number(amount) +
//       Number(waterCharge) +
//       Number(electricityCharge) +
//       Number(lateFee);

//     const payment = await prisma.payment.create({
//       data: {
//         userId: Number(userId),
//         societyId: Number(societyId),
//         amount: Number(amount),
//         waterCharge: Number(waterCharge),
//         electricityCharge: Number(electricityCharge),
//         lateFee: Number(lateFee),
//         totalAmount,
//         month,
//         dueDate: new Date(dueDate),
//       },
//     });

//     res.status(201).json(payment);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Payment create failed",
//     });
//   }
// };

// export const getPayments = async (req, res) => {
//   try {
//     const payments = await prisma.payment.findMany({
//       include: {
//         user: true,
//         society: true,
//       },
//     });

//     res.json(payments);

//   } catch (error) {
//     console.log("==============");
//     console.log(error);
//     console.log("==============");

//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };
// export const markPaymentPaid = async (req, res) => {
//   try {
//     const payment = await prisma.payment.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         status: "PAID",
//       },
//     });

//     res.json(payment);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
// export const updatePayment = async (req, res) => {
//   try {
//     const payment = await prisma.payment.update({
//       where: {
//         id: Number(req.params.id),
//       },

//       data: req.body,
//     });

//     res.json(payment);

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Update Failed",
//     });
//   }
// };
// export const deletePayment = async (req, res) => {

//   try {

//     await prisma.payment.delete({

//       where: {

//         id: Number(req.params.id),

//       },

//     });

//     res.json({
//       message: "Payment Deleted",
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Delete Failed",
//     });

//   }


// };

import prisma from "../config/prisma.js";

// =====================================
// CREATE PAYMENT
// =====================================
export const createPayment = async (req, res) => {
  try {
    const {
      userId,
      societyId,
      amount,
      waterCharge,
      electricityCharge,
      lateFee,
      month,
      dueDate,
    } = req.body;

    // Validate required fields
    if (!userId || !societyId || !month || !dueDate) {
      return res.status(400).json({
        message: "User, Society, Month and Due Date are required",
      });
    }

    const maintenance = Number(amount || 0);
    const water = Number(waterCharge || 0);
    const electricity = Number(electricityCharge || 0);
    const late = Number(lateFee || 0);

    const totalAmount =
      maintenance +
      water +
      electricity +
      late;

    const payment = await prisma.payment.create({
      data: {
        userId: Number(userId),
        societyId: Number(societyId),
        amount: maintenance,
        waterCharge: water,
        electricityCharge: electricity,
        lateFee: late,
        totalAmount,
        month,
        dueDate: new Date(dueDate),
        status: "PENDING",
      },

      include: {
        user: true,
        society: true,
      },
    });

    res.status(201).json(payment);

  } catch (error) {
    console.error("CREATE PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Payment create failed",
      error: error.message,
    });
  }
};


// =====================================
// GET ALL PAYMENTS
// =====================================
export const getPayments = async (req, res) => {
  try {

    console.log("===== GET PAYMENTS =====");

    const payments = await prisma.payment.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        society: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });

    console.log("PAYMENTS FOUND:", payments.length);

    res.status(200).json(payments);

  } catch (error) {

    console.error("=================================");
    console.error("GET PAYMENTS ERROR:");
    console.error(error);
    console.error("=================================");

    res.status(500).json({
      message: "Failed to fetch payments",
      error: error.message,
    });
  }
};


// =====================================
// MARK PAYMENT AS PAID
// =====================================
export const markPaymentPaid = async (req, res) => {
  try {

    const paymentId = Number(req.params.id);

    if (!paymentId) {
      return res.status(400).json({
        message: "Invalid payment ID",
      });
    }

    const payment = await prisma.payment.update({
      where: {
        id: paymentId,
      },

      data: {
        status: "PAID",
      },

      include: {
        user: true,
        society: true,
      },
    });

    res.status(200).json(payment);

  } catch (error) {

    console.error("MARK PAYMENT PAID ERROR:", error);

    res.status(500).json({
      message: "Failed to mark payment as paid",
      error: error.message,
    });
  }
};


// =====================================
// UPDATE PAYMENT
// =====================================
export const updatePayment = async (req, res) => {
  try {

    const paymentId = Number(req.params.id);

    const {
      userId,
      societyId,
      amount,
      waterCharge,
      electricityCharge,
      lateFee,
      month,
      dueDate,
      status,
    } = req.body;

    const maintenance = Number(amount || 0);
    const water = Number(waterCharge || 0);
    const electricity = Number(electricityCharge || 0);
    const late = Number(lateFee || 0);

    const totalAmount =
      maintenance +
      water +
      electricity +
      late;

    const payment = await prisma.payment.update({
      where: {
        id: paymentId,
      },

      data: {
        ...(userId !== undefined && {
          userId: Number(userId),
        }),

        ...(societyId !== undefined && {
          societyId: Number(societyId),
        }),

        ...(amount !== undefined && {
          amount: maintenance,
        }),

        ...(waterCharge !== undefined && {
          waterCharge: water,
        }),

        ...(electricityCharge !== undefined && {
          electricityCharge: electricity,
        }),

        ...(lateFee !== undefined && {
          lateFee: late,
        }),

        ...(month !== undefined && {
          month,
        }),

        ...(dueDate !== undefined && {
          dueDate: new Date(dueDate),
        }),

        ...(status !== undefined && {
          status,
        }),

        totalAmount,
      },

      include: {
        user: true,
        society: true,
      },
    });

    res.status(200).json(payment);

  } catch (error) {

    console.error("UPDATE PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Update payment failed",
      error: error.message,
    });
  }
};


// =====================================
// DELETE PAYMENT
// =====================================
export const deletePayment = async (req, res) => {
  try {

    const paymentId = Number(req.params.id);

    await prisma.payment.delete({
      where: {
        id: paymentId,
      },
    });

    res.status(200).json({
      message: "Payment deleted successfully",
    });

  } catch (error) {

    console.error("DELETE PAYMENT ERROR:", error);

    res.status(500).json({
      message: "Delete payment failed",
      error: error.message,
    });
  }
};