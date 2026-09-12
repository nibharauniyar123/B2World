// import express from "express";

// import {
//   createExpense,
//   getExpenses,
//   deleteExpense,
// } from "../controllers/expenseController.js";

// const router = express.Router();

// router.post("/", createExpense);
// router.get("/", getExpenses);
// router.delete("/:id", deleteExpense);

// export default router;
import express from "express";

import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";


const router = express.Router();


// GET all expenses
router.get("/", getExpenses);


// GET single expense
router.get("/:id", getExpenseById);


// CREATE expense
router.post("/", createExpense);


// UPDATE expense
router.put("/:id", updateExpense);


// DELETE expense
router.delete("/:id", deleteExpense);


export default router;