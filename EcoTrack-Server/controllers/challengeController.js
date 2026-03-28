const Challenge = require('../models/Challenge');
const UserChallenge = require('../models/UserChallenge');

// @desc    Get all challenges with advanced filtering
// @route   GET /api/challenges
const getChallenges = async (req, res) => {
  try {
    let query = {};

    // Category filter with $in
    if (req.query.category) {
      const categories = req.query.category.split(',');
      query.category = { $in: categories };
    }

    // Date range filter with $gte and $lte
    if (req.query.startDate || req.query.endDate) {
      query.startDate = {};
      if (req.query.startDate) {
        query.startDate.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        query.startDate.$lte = new Date(req.query.endDate);
      }
    }

    // Participants range filter with $gte and $lte
    if (req.query.minParticipants || req.query.maxParticipants) {
      query.participants = {};
      if (req.query.minParticipants) {
        query.participants.$gte = parseInt(req.query.minParticipants);
      }
      if (req.query.maxParticipants) {
        query.participants.$lte = parseInt(req.query.maxParticipants);
      }
    }

    // Status filter
    if (req.query.status) {
      query.status = req.query.status;
    }

    const challenges = await Challenge.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(req.query.limit) || 50);

    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single challenge
// @route   GET /api/challenges/:id
const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a challenge
// @route   POST /api/challenges
const createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge({
      ...req.body,
      createdBy: req.user.email
    });

    const savedChallenge = await challenge.save();
    res.status(201).json(savedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Join a challenge
// @route   POST /api/challenges/join/:id
const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if challenge is still active
    if (challenge.status === 'Completed') {
      return res.status(400).json({ message: 'This challenge has already ended' });
    }

    // Check if user already joined
    const existingJoin = await UserChallenge.findOne({
      userId: req.user.userId,
      challengeId: req.params.id
    });

    if (existingJoin) {
      return res.status(400).json({ message: 'You have already joined this challenge' });
    }

    // Create user challenge entry
    const userChallenge = new UserChallenge({
      userId: req.user.userId,
      challengeId: req.params.id,
      status: 'Ongoing'
    });

    await userChallenge.save();

    // Increment participants count
    challenge.participants += 1;
    await challenge.save();

    res.status(201).json({
      message: 'Successfully joined the challenge',
      userChallenge
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update challenge
// @route   PUT /api/challenges/:id
const updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is the creator
    if (challenge.createdBy !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to update this challenge' });
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete challenge
// @route   DELETE /api/challenges/:id
const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is the creator
    if (challenge.createdBy !== req.user.email) {
      return res.status(403).json({ message: 'Not authorized to delete this challenge' });
    }

    await challenge.deleteOne();
    res.json({ message: 'Challenge removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getChallenges,
  getChallengeById,
  createChallenge,
  joinChallenge,
  updateChallenge,
  deleteChallenge
};