import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { poll_id, option_id } = req.body;

  try {
    await pool.query(
      "INSERT INTO votes (user_id, poll_id, option_id) VALUES (?, ?, ?)",
      [req.user.id, poll_id, option_id]
    );
    res.json({ message: "Vote recorded" });
  } catch {
    res.status(400).json({ message: "You already voted" });
  }
});

export default router;
