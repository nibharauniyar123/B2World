// import prisma from "../config/prisma.js";

// export const createExpense = async (req, res) => {
//   try {
//     const expense = await prisma.expense.create({
//       data: {
//         title: req.body.title,
//         amount: Number(req.body.amount),
//         category: req.body.category,
//         description: req.body.description,
//         vendorId: req.body.vendorId
//           ? Number(req.body.vendorId)
//           : null,
//       },
//     });

//     res.json(expense);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getExpenses = async (req, res) => {
//   try {
//     const expenses = await prisma.expense.findMany({
//       include: {
//         vendor: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     res.json(expenses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteExpense = async (req, res) => {
//   try {
//     await prisma.expense.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });

//     res.json({ message: "Expense deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// ==========================================
// GET ALL EXPENSES
// ==========================================
export const getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        vendor: true,
        society: true,
      },

      orderBy: {
        date: "desc",
      },
    });

    res.status(200).json(expenses);

  } catch (error) {
    console.error("GET EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch expenses",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE EXPENSE
// ==========================================
export const getExpenseById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const expense = await prisma.expense.findUnique({
      where: {
        id,
      },

      include: {
        vendor: true,
        society: true,
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json(expense);

  } catch (error) {
    console.error("GET EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch expense",
      error: error.message,
    });
  }
};


// ==========================================
// CREATE EXPENSE
// ==========================================
export const createExpense = async (req, res) => {
  try {
    const {
      title,
      description,
      amount,
      category,
      date,
      paymentMethod,
      receipt,
      vendorId,
      societyId,
    } = req.body;


    // Basic validation
    if (!title || !amount || !category) {
      return res.status(400).json({
        message: "Title, amount and category are required",
      });
    }


    const expense = await prisma.expense.create({
      data: {
        title,
        description: description || null,

        amount: Number(amount),

        category,

        date: date
          ? new Date(date)
          : new Date(),

        paymentMethod:
          paymentMethod || null,

        receipt:
          receipt || null,

        vendorId:
          vendorId
            ? Number(vendorId)
            : null,

        societyId:
          societyId
            ? Number(societyId)
            : null,
      },

      include: {
        vendor: true,
        society: true,
      },
    });


    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });

  } catch (error) {
    console.error("CREATE EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Expense create failed",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE EXPENSE
// ==========================================
export const updateExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingExpense =
      await prisma.expense.findUnique({
        where: {
          id,
        },
      });


    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }


    const {
      title,
      description,
      amount,
      category,
      date,
      paymentMethod,
      receipt,
      vendorId,
      societyId,
    } = req.body;


    const expense = await prisma.expense.update({
      where: {
        id,
      },

      data: {
        ...(title !== undefined && {
          title,
        }),

        ...(description !== undefined && {
          description,
        }),

        ...(amount !== undefined && {
          amount: Number(amount),
        }),

        ...(category !== undefined && {
          category,
        }),

        ...(date !== undefined && {
          date: new Date(date),
        }),

        ...(paymentMethod !== undefined && {
          paymentMethod,
        }),

        ...(receipt !== undefined && {
          receipt,
        }),

        ...(vendorId !== undefined && {
          vendorId: vendorId
            ? Number(vendorId)
            : null,
        }),

        ...(societyId !== undefined && {
          societyId: societyId
            ? Number(societyId)
            : null,
        }),
      },

      include: {
        vendor: true,
        society: true,
      },
    });


    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });

  } catch (error) {
    console.error("UPDATE EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Expense update failed",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE EXPENSE
// ==========================================
export const deleteExpense = async (req, res) => {
  try {
    const id = Number(req.params.id);


    const existingExpense =
      await prisma.expense.findUnique({
        where: {
          id,
        },
      });


    if (!existingExpense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }


    await prisma.expense.delete({
      where: {
        id,
      },
    });


    res.status(200).json({
      message: "Expense deleted successfully",
    });

  } catch (error) {
    console.error("DELETE EXPENSE ERROR:", error);

    res.status(500).json({
      message: "Expense delete failed",
      error: error.message,
    });
  }
};