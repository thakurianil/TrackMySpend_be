// routes/expense.js
import express from "express";
import Expense from "../models/expenseModal.js";
import auth from "../middleware/auth.js";
import mongoose from "mongoose";
const router = express.Router();

// Create a new expense
router.post("/create", auth, async (req, res) => {
  const { title, amount, date, category, description } = req.body;

  try {
    const expense = new Expense({
      userId: req.user.id, // Attach userId from the auth middleware
      title,
      amount,
      date,
      category,
      description,
    });

    await expense.save();
    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating expense", error });
  }
});

// Get all expenses for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }); // Filter by user's ID
    res.json({
      success: true,
      message: "Expenses retrieved successfully",
      expenses,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching expenses", error });
  }
});

// Update an expense by ID
router.put("/:id", auth, async (req, res) => {
  const { title, amount, date, category, description } = req.body;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // Ensure the expense belongs to the authenticated user
      { title, amount, date, category, description },
      { new: true }
    );

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.json({
      success: true,
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating expense", error });
  }
});

// Delete an expense by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // Ensure the expense belongs to the authenticated user
    });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.json({
      success: true,
      message: "Expense deleted successfully",
      expense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting expense", error });
  }
});

// Get all categories with their respective titles and amounts
router.get("/grouped/categories", auth, async (req, res) => {
  try {
    console.log("User ID:", req.user.id); // Debug

    const grouped = await Expense.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: "$category",
          expenses: {
            $push: {
              title: "$title",
              amount: "$amount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          expenses: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Expenses grouped by category",
      data: grouped,
    });
  } catch (error) {
    console.error("Aggregation error:", error);
    res.status(500).json({
      success: false,
      message: "Error grouping expenses",
      error: error.message || error,
    });
  }
});

export default router;
