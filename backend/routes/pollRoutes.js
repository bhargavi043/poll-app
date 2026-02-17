import express from "express";
import Poll from "../models/Poll.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Create poll
router.post("/", protect, async (req, res) => {
  const { title, description, options } = req.body;
  const poll = await Poll.create({
    title,
    description,
    options: options.map(o => ({ text: o })),
    createdBy: req.user._id,
  });
  res.json(poll);
});

// List polls
router.get("/", protect, async (req, res) => {
  const polls = await Poll.find().sort({ createdAt: -1 });
  res.json(polls);
});

// Poll detail
router.get("/:id", protect, async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });
  res.json(poll);
});

// Vote
router.post("/:id/vote", protect, async (req, res) => {
  const { option } = req.body;
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ message: "Poll not found" });

  // Check if user already voted
  const alreadyVoted = poll.votes.find(v => v.user.toString() === req.user._id.toString());
  if (alreadyVoted) return res.status(400).json({ message: "Already voted" });

  // Add vote
  poll.votes.push({ user: req.user._id, option });
  const opt = poll.options.find(o => o.text === option);
  if (opt) opt.votes += 1;

  await poll.save();
  res.json(poll);
});

export default router;
