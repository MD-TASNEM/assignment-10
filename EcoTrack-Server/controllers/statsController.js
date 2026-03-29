const { COLLECTIONS, getCollection } = require("../config/db");
const { getErrorResponse } = require("../utils/errors");

const getChallengesCollection = () => getCollection(COLLECTIONS.challenges);
const getUserChallengesCollection = () =>
  getCollection(COLLECTIONS.userChallenges);
const getTipsCollection = () => getCollection(COLLECTIONS.tips);
const getEventsCollection = () => getCollection(COLLECTIONS.events);

// @desc    Get community statistics
// @route   GET /api/stats/community
const getCommunityStats = async (req, res) => {
  try {
    const [challengeStats] = await getChallengesCollection()
      .aggregate([
        {
          $group: {
            _id: null,
            totalParticipants: {
              $sum: { $ifNull: ["$participants", 0] },
            },
          },
        },
      ])
      .toArray();

    const totalParticipants = challengeStats?.totalParticipants || 0;
    const totalTips = await getTipsCollection().countDocuments();
    const totalEvents = await getEventsCollection().countDocuments();

    res.json({
      totalCO2Saved: totalParticipants * 50,
      totalPlasticReduced: totalParticipants * 10,
      totalParticipants,
      totalTips,
      totalEvents,
    });
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Get leaderboard data
// @route   GET /api/stats/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await getUserChallengesCollection()
      .aggregate([
        {
          $group: {
            _id: "$userId",
            totalChallenges: { $sum: 1 },
            completedChallenges: {
              $sum: {
                $cond: [{ $eq: ["$status", "Finished"] }, 1, 0],
              },
            },
            averageProgress: { $avg: "$progress" },
          },
        },
        {
          $sort: { completedChallenges: -1, averageProgress: -1 },
        },
        {
          $limit: 10,
        },
      ])
      .toArray();

    res.json(
      leaderboard.map((entry) => ({
        ...entry,
        userId: entry._id,
      })),
    );
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  getCommunityStats,
  getLeaderboard,
};
