import express from "express";

const router = express.Router();

// Signup route
router.post("/signup", (req, res) => {
  res.json({ message: "Signup route working" });
});

// Login route
router.post("/login", (req, res) => {
  res.json({ message: "Login route working" });
});

export default router;
