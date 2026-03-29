const { COLLECTIONS, getCollection } = require("../config/db");
const { getErrorResponse } = require("../utils/errors");
const {
  prepareUserChallengeDocument,
  serializeUserChallenge,
  serializeUserChallenges,
} = require("../utils/entities");
const { buildIdFilter, buildObjectIdFilter } = require("../utils/mongo");

const getUserChallengesCollection = () =>
  getCollection(COLLECTIONS.userChallenges);

// @desc    Get user's challenges
// @route   GET /api/user-challenges
const getUserChallenges = async (req, res) => {
  try {
    const userChallenges = await getUserChallengesCollection()
      .aggregate([
        {
          $match: { userId: req.user.userId },
        },
        {
          $sort: { joinDate: -1 },
        },
        {
          $lookup: {
            from: COLLECTIONS.challenges,
            localField: "challengeId",
            foreignField: "_id",
            as: "challenge",
          },
        },
        {
          $addFields: {
            challengeId: {
              $cond: [
                { $gt: [{ $size: "$challenge" }, 0] },
                { $arrayElemAt: ["$challenge", 0] },
                "$challengeId",
              ],
            },
          },
        },
        {
          $project: { challenge: 0 },
        },
      ])
      .toArray();

    res.json(serializeUserChallenges(userChallenges));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Update challenge progress
// @route   PATCH /api/user-challenges/:challengeId/progress
const updateProgress = async (req, res) => {
  try {
    const filter = buildObjectIdFilter("challengeId", req.params.challengeId);
    const userChallengesCollection = getUserChallengesCollection();

    if (!filter) {
      return res.status(404).json({ message: "User challenge not found" });
    }

    const userChallenge = await userChallengesCollection.findOne({
      userId: req.user.userId,
      ...filter,
    });

    if (!userChallenge) {
      return res.status(404).json({ message: "User challenge not found" });
    }

    const updatedDocument = prepareUserChallengeDocument(
      { progress: req.body.progress },
      {
        existingDocument: userChallenge,
        userId: userChallenge.userId,
        challengeId: userChallenge.challengeId,
      },
    );
    const { _id, createdAt, ...challengeChanges } = updatedDocument;

    await userChallengesCollection.updateOne(buildIdFilter(userChallenge._id), {
      $set: challengeChanges,
    });

    res.json(
      serializeUserChallenge({
        ...userChallenge,
        ...challengeChanges,
        _id: userChallenge._id,
        createdAt: userChallenge.createdAt || createdAt,
      }),
    );
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Get challenge statistics for user
// @route   GET /api/user-challenges/stats
const getUserStats = async (req, res) => {
  try {
    const [stats] = await getUserChallengesCollection()
      .aggregate([
        {
          $match: { userId: req.user.userId },
        },
        {
          $group: {
            _id: null,
            totalChallenges: { $sum: 1 },
            completedChallenges: {
              $sum: {
                $cond: [{ $eq: ["$status", "Finished"] }, 1, 0],
              },
            },
            ongoingChallenges: {
              $sum: {
                $cond: [{ $eq: ["$status", "Ongoing"] }, 1, 0],
              },
            },
            averageProgress: { $avg: "$progress" },
          },
        },
      ])
      .toArray();

    res.json({
      totalChallenges: stats?.totalChallenges || 0,
      completedChallenges: stats?.completedChallenges || 0,
      ongoingChallenges: stats?.ongoingChallenges || 0,
      averageProgress: Math.round(stats?.averageProgress || 0),
    });
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  getUserChallenges,
  getUserStats,
  updateProgress,
};
