
import prisma from "../config/prisma.js";

// export const createPayment = async (req, res) => {
//   try {
//     // const {
//     //   userId,
//     //   amount,
//     //   waterCharge,
//     //   electricityCharge,
//     //   lateFee,
//     // } = req.body;

//     // const totalAmount =
//     //   Number(amount) +
//     //   Number(waterCharge) +
//     //   Number(electricityCharge) +
//     //   Number(lateFee);

//     // const payment = await prisma.payment.create({
//     //   data: {
//     //     userId: Number(userId),
//     //     amount: Number(amount),
//     //     waterCharge: Number(waterCharge),
//     //     electricityCharge: Number(electricityCharge),
//     //     lateFee: Number(lateFee),
//     //     totalAmount,
//     //   },
//     // });
//     const {
//   userId,
//   amount,
//   waterCharge,
//   electricityCharge,
//   lateFee,
//   month,
//   dueDate,
//   societyId,
// } = req.body;

// const payment = await prisma.payment.create({
//   data:{
//     userId:Number(userId),

//     amount:Number(amount),

//     waterCharge:Number(waterCharge),

//     electricityCharge:Number(electricityCharge),

//     lateFee:Number(lateFee),

//     totalAmount,

//     month,

//     dueDate:new Date(dueDate),

//     societyId:Number(societyId),
//   }
// });

//     res.status(201).json(payment);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Failed" });
//   }
// };
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

    // Calculate total amount
    const totalAmount =
      Number(amount) +
      Number(waterCharge) +
      Number(electricityCharge) +
      Number(lateFee);

    const payment = await prisma.payment.create({
      data: {
        userId: Number(userId),
        societyId: Number(societyId),
        amount: Number(amount),
        waterCharge: Number(waterCharge),
        electricityCharge: Number(electricityCharge),
        lateFee: Number(lateFee),
        totalAmount,
        month,
        dueDate: new Date(dueDate),
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Payment create failed",
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: true,
        society: true,
      },
    });

    res.json(payments);

  } catch (error) {
    console.log("==============");
    console.log(error);
    console.log("==============");

    res.status(500).json({
      error: error.message,
    });
  }
};
export const markPaymentPaid = async (req, res) => {
  try {
    const payment = await prisma.payment.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: "PAID",
      },
    });

    res.json(payment);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updatePayment = async (req, res) => {
  try {
    const payment = await prisma.payment.update({
      where: {
        id: Number(req.params.id),
      },

      data: req.body,
    });

    res.json(payment);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Update Failed",
    });
  }
};
export const deletePayment = async (req, res) => {

  try {

    await prisma.payment.delete({

      where: {

        id: Number(req.params.id),

      },

    });

    res.json({
      message: "Payment Deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Delete Failed",
    });

  }

};