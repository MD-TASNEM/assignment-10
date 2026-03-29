const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @desc    Issue JWT token for authenticated client user
// @route   POST /api/auth/token
router.post("/token", (req, res) => {
  const { email, userId, name } = req.body || {};

  if (!email || !userId) {
    return res.status(400).json({
      message: "email and userId are required",
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "JWT_SECRET is not configured",
    });
  }

  const token = jwt.sign(
    {
      email: String(email).trim().toLowerCase(),
      userId: String(userId),
      name: String(name || "").trim() || "EcoTrack User",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return res.status(200).json({ token });
});

module.exports = router;
