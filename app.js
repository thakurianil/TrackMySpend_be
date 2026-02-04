import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigin = "https://track-my-spend-fe-agvb.vercel.app/" || "http://localhost:3000";

app.use(
    cors({
        origin: allowedOrigin,
        credentials: true,
    })
);


// Connect to the database
connectDB().catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1);
});

// Use user routes
app.use("/api/auth", userRoutes);

app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
