
import prisma from "../config/prisma.js";

export const createMaintenance = async (req, res) => {
  try {
    console.log("BODY:", req.body);

   const { userId, amount, month, dueDate } = req.body;

const amountNum = Number(amount);
    const today = new Date();

    let lateFee = 0;

    if (today > new Date(dueDate)) {
  lateFee = amountNum * 0.05;
}

const gst = amountNum * 0.13;

const total = amountNum + gst + lateFee;

    const bill = await prisma.maintenance.create({
      data: {
        userId: Number(userId),
        amount: amountNum,
        month,
        dueDate: new Date(dueDate),
        gst,
        lateFee,
        total,
        status: "PENDING",
      },
    });

    res.status(201).json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create maintenance bill",
    });
  }
};

export const getMaintenanceBills = async (req, res) => {
  try {
    const bills = await prisma.maintenance.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(bills);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch bills",
    });
  }
};

export const markPaid = async (req, res) => {
  try {
    const bill = await prisma.maintenance.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: "PAID",
      },
    });

    res.json(bill);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update bill",
    });
  }
};