const Tip = require("../models/Tip");

// @desc    Get all tips
// @route   GET /api/tips
const getTips = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const tips = await Tip.find().sort({ createdAt: -1 }).limit(limit);

    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent tips for homepage
// @route   GET /api/tips/recent
const getRecentTips = async (req, res) => {
  try {
    const tips = await Tip.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title content category authorName upvotes createdAt imageUrl");

    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a tip
// @route   POST /api/tips
const createTip = async (req, res) => {
  try {
    const tip = new Tip({
      ...req.body,
      author: req.user.email,
      authorName: req.user.name,
    });

    const savedTip = await tip.save();
    res.status(201).json(savedTip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Upvote a tip
// @route   PATCH /api/tips/:id/upvote
const upvoteTip = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);

    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    tip.upvotes += 1;
    await tip.save();

    res.json({ message: "Tip upvoted successfully", upvotes: tip.upvotes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTips,
  getRecentTips,
  createTip,
  upvoteTip,
};
