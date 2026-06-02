import prisma from "../config/prisma.js";

export const getReports = async (req, res) => {
  try {

    const payments = await prisma.payment.findMany();

    const complaints = await prisma.complaint.findMany();

    const visitors = await prisma.visitor.findMany();

    const expenses = await prisma.expense.findMany();

    const totalRevenue = payments.reduce(
      (sum, p) => sum + p.totalAmount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );
    const openComplaints = complaints.filter(
  (c) => c.status === "OPEN"
).length;

const progressComplaints = complaints.filter(
  (c) => c.status === "IN_PROGRESS"
).length;

const resolvedComplaints = complaints.filter(
  (c) => c.status === "RESOLVED"
).length;

res.json({
  payments,
  complaints,
  visitors,
  expenses,
  totalRevenue,
  totalExpense,

  complaintStats: {
    open: openComplaints,
    progress: progressComplaints,
    resolved: resolvedComplaints,
  },
});

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed",
    });
  }
};