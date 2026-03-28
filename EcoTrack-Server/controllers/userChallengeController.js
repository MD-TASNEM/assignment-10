const UserChallenge = require('../models/UserChallenge');
const Challenge = require('../models/Challenge');

// @desc    Get user's challenges
// @route   GET /api/user-challenges
const getUserChallenges = async (req, res) => {
  try {
    const userChallenges = await UserChallenge.find({ userId: req.user.userId })
      .populate('challengeId')
      .sort({ joinDate: -1 });

    res.json(userChallenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update challenge progress
// @route   PATCH /api/user-challenges/:challengeId/progress
const updateProgress = async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: 'Progress must be between 0 and 100' });
    }

    const userChallenge = await UserChallenge.findOne({
      userId: req.user.userId,
      challengeId: req.params.challengeId
    });

    if (!userChallenge) {
      return res.status(404).json({ message: 'User challenge not found' });
    }

    userChallenge.progress = progress;
    await userChallenge.save();

    res.json(userChallenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get challenge statistics for user
// @route   GET /api/user-challenges/stats
const getUserStats = async (req, res) => {
  try {
    const userChallenges = await UserChallenge.find({ userId: req.user.userId });

    const stats = {
      totalChallenges: userChallenges.length,
      completedChallenges: userChallenges.filter(uc => uc.status === 'Finished').length,
      ongoingChallenges: userChallenges.filter(uc => uc.status === 'Ongoing').length,
      averageProgress: 0
    };

    if (userChallenges.length > 0) {
      const totalProgress = userChallenges.reduce((sum, uc) => sum + uc.progress, 0);
      stats.averageProgress = Math.round(totalProgress / userChallenges.length);
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserChallenges,
  updateProgress,
  getUserStats
};