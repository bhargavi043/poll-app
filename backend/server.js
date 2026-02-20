import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route (Important for Deployment Check)
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.send("API is running & DB connected ✅");
  } catch (error) {
    res.status(500).send("DB connection failed ❌");
  }
});

// Routes
app.use("/api/auth", authRoutes);

// PORT for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});