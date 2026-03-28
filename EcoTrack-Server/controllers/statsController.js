const Challenge = require('../models/Challenge');
const UserChallenge = require('../models/UserChallenge');
const Tip = require('../models/Tip');
const Event = require('../models/Event');

// @desc    Get community statistics
// @route   GET /api/stats/community
const getCommunityStats = async (req, res) => {
  try {
    // Get total participants across all challenges
    const challenges = await Challenge.find();
    const totalParticipants = challenges.reduce((sum, c) => sum + c.participants, 0);

    // Get total CO2 saved (example calculation)
    const totalCO2Saved = totalParticipants * 50; // 50kg per participant

    // Get total plastic reduced (example calculation)
    const totalPlasticReduced = totalParticipants * 10; // 10kg per participant

    // Get total tips shared
    const totalTips = await Tip.countDocuments();

    // Get total events hosted
    const totalEvents = await Event.countDocuments();

    const stats = {
      totalCO2Saved,
      totalPlasticReduced,
      totalParticipants,
      totalTips,
      totalEvents
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get leaderboard data
// @route   GET /api/stats/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await UserChallenge.aggregate([
      {
        $group: {
          _id: '$userId',
          totalChallenges: { $sum: 1 },
          completedChallenges: {
            $sum: { $cond: [{ $eq: ['$status', 'Finished'] }, 1, 0] }
          },
          averageProgress: { $avg: '$progress' }
        }
      },
      { $sort: { completedChallenges: -1, averageProgress: -1 } },
      { $limit: 10 }
    ]);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCommunityStats,
  getLeaderboard
};