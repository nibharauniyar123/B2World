import prisma from "../config/prisma.js";

export const createExpense = async (req, res) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        title: req.body.title,
        amount: Number(req.body.amount),
        category: req.body.category,
        description: req.body.description,
        vendorId: req.body.vendorId
          ? Number(req.body.vendorId)
          : null,
      },
    });

    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        vendor: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await prisma.expense.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};