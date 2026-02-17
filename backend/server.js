import express from "express";
import db from "./config/db.js";

import cors from "cors";

import authRoutes from "./routes/authRoutes.js";   // 👈 ADD HERE

const app = express();

app.use(cors());
app.use(express.json());

// Use the route
app.use("/api/auth", authRoutes);   // 👈 ADD HERE



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
