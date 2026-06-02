// import prisma from "../prisma/prismaClient.js";


// // CREATE PAYMENT
// export const createPayment = async (req, res) => {
//   try {

//     const {
//       userId,
//       amount,
//       waterCharge,
//       electricityCharge,
//       lateFee,
//     } = req.body;

//     const totalAmount =
//       Number(amount) +
//       Number(waterCharge) +
//       Number(electricityCharge) +
//       Number(lateFee);

//     const payment = await prisma.payment.create({
//       data: {
//         userId: Number(userId),
//         amount: Number(amount),
//         waterCharge: Number(waterCharge),
//         electricityCharge: Number(electricityCharge),
//         lateFee: Number(lateFee),
//         totalAmount,
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


// // GET PAYMENTS
// export const getPayments = async (req, res) => {
//   try {

//     const payments = await prisma.payment.findMany({
//       include: {
//         user: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     res.json(payments);

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Failed to fetch payments",
//     });
//   }
// };
import prisma from "../config/prisma.js";

export const createPayment = async (req, res) => {
  try {
    const {
      userId,
      amount,
      waterCharge,
      electricityCharge,
      lateFee,
    } = req.body;

    const totalAmount =
      Number(amount) +
      Number(waterCharge) +
      Number(electricityCharge) +
      Number(lateFee);

    const payment = await prisma.payment.create({
      data: {
        userId: Number(userId),
        amount: Number(amount),
        waterCharge: Number(waterCharge),
        electricityCharge: Number(electricityCharge),
        lateFee: Number(lateFee),
        totalAmount,
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed" });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(payments);
  } catch (error) {
    res.status(500).json(error);
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