const { COLLECTIONS, getCollection } = require("../config/db");
const { getErrorResponse } = require("../utils/errors");
const {
  deriveChallengeStatus,
  prepareChallengeDocument,
  prepareUserChallengeDocument,
  serializeChallenge,
  serializeChallenges,
  serializeUserChallenge,
} = require("../utils/entities");
const { buildIdFilter, findById } = require("../utils/mongo");

const getChallengesCollection = () => getCollection(COLLECTIONS.challenges);
const getUserChallengesCollection = () =>
  getCollection(COLLECTIONS.userChallenges);

const parsePositiveInteger = (value, defaultValue) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return defaultValue;
  }

  return parsed;
};

// @desc    Get all challenges with advanced filtering
// @route   GET /api/challenges
const getChallenges = async (req, res) => {
  try {
    const query = {};

    if (req.query.category) {
      const categories = req.query.category
        .split(",")
        .map((category) => category.trim())
        .filter(Boolean);

      if (categories.length > 0) {
        query.category = { $in: categories };
      }
    }

    if (req.query.startDate || req.query.endDate) {
      query.startDate = {};

      if (req.query.startDate) {
        query.startDate.$gte = new Date(req.query.startDate);
      }

      if (req.query.endDate) {
        query.startDate.$lte = new Date(req.query.endDate);
      }
    }

    if (req.query.minParticipants || req.query.maxParticipants) {
      query.participants = {};

      if (req.query.minParticipants) {
        query.participants.$gte = Number.parseInt(
          req.query.minParticipants,
          10,
        );
      }

      if (req.query.maxParticipants) {
        query.participants.$lte = Number.parseInt(
          req.query.maxParticipants,
          10,
        );
      }
    }

    if (req.query.status) {
      const now = new Date();

      if (req.query.status === "Upcoming") {
        query.startDate = { ...(query.startDate || {}), $gt: now };
      } else if (req.query.status === "Active") {
        query.startDate = { ...(query.startDate || {}), $lte: now };
        query.endDate = { ...(query.endDate || {}), $gte: now };
      } else if (req.query.status === "Completed") {
        query.endDate = { ...(query.endDate || {}), $lt: now };
      } else {
        query.status = req.query.status;
      }
    }

    const limit = Math.min(parsePositiveInteger(req.query.limit, 50), 100);
    const challenges = await getChallengesCollection()
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    res.json(serializeChallenges(challenges));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Get single challenge
// @route   GET /api/challenges/:id
const getChallengeById = async (req, res) => {
  try {
    const challenge = await findById(getChallengesCollection(), req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.json(serializeChallenge(challenge));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Create a challenge
// @route   POST /api/challenges
const createChallenge = async (req, res) => {
  try {
    const challengeDocument = prepareChallengeDocument(req.body, {
      userEmail: req.user.email,
    });
    const insertResult = await getChallengesCollection().insertOne(
      challengeDocument,
    );
    const savedChallenge = challengeDocument._id
      ? challengeDocument
      : { ...challengeDocument, _id: insertResult.insertedId };

    res.status(201).json(serializeChallenge(savedChallenge));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error, 400);
    res.status(statusCode).json({ message });
  }
};

// @desc    Join a challenge
// @route   POST /api/challenges/join/:id
const joinChallenge = async (req, res) => {
  try {
    const challengesCollection = getChallengesCollection();
    const userChallengesCollection = getUserChallengesCollection();
    const challenge = await findById(challengesCollection, req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    const currentStatus =
      deriveChallengeStatus(challenge.startDate, challenge.endDate) ||
      challenge.status;

    if (currentStatus === "Completed") {
      return res
        .status(400)
        .json({ message: "This challenge has already ended" });
    }

    const existingJoin = await userChallengesCollection.findOne({
      userId: req.user.userId,
      challengeId: challenge._id,
    });

    if (existingJoin) {
      return res
        .status(400)
        .json({ message: "You have already joined this challenge" });
    }

    const now = new Date();
    const userChallengeDocument = prepareUserChallengeDocument(
      { status: "Ongoing" },
      {
        userId: req.user.userId,
        challengeId: challenge._id,
        now,
      },
    );

    const insertResult = await userChallengesCollection.insertOne(
      userChallengeDocument,
    );
    const updatedParticipants = Number(challenge.participants || 0) + 1;

    await challengesCollection.updateOne(buildIdFilter(challenge._id), {
      $set: {
        participants: updatedParticipants,
        updatedAt: now,
        status:
          deriveChallengeStatus(challenge.startDate, challenge.endDate, now) ||
          challenge.status ||
          "Upcoming",
      },
    });

    const savedUserChallenge = userChallengeDocument._id
      ? userChallengeDocument
      : { ...userChallengeDocument, _id: insertResult.insertedId };

    res.status(201).json({
      message: "Successfully joined the challenge",
      userChallenge: serializeUserChallenge(savedUserChallenge),
    });
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Update challenge
// @route   PUT /api/challenges/:id
const updateChallenge = async (req, res) => {
  try {
    const challengesCollection = getChallengesCollection();
    const challenge = await findById(challengesCollection, req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (challenge.createdBy !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this challenge" });
    }

    const updatedDocument = prepareChallengeDocument(req.body, {
      existingDocument: challenge,
      userEmail: challenge.createdBy,
    });
    const { _id, createdAt, ...challengeChanges } = updatedDocument;

    await challengesCollection.updateOne(buildIdFilter(challenge._id), {
      $set: challengeChanges,
    });

    res.json(
      serializeChallenge({
        ...challenge,
        ...challengeChanges,
        _id: challenge._id,
        createdAt: challenge.createdAt || createdAt,
      }),
    );
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error, 400);
    res.status(statusCode).json({ message });
  }
};

// @desc    Delete challenge
// @route   DELETE /api/challenges/:id
const deleteChallenge = async (req, res) => {
  try {
    const challengesCollection = getChallengesCollection();
    const userChallengesCollection = getUserChallengesCollection();
    const challenge = await findById(challengesCollection, req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (challenge.createdBy !== req.user.email) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this challenge" });
    }

    await challengesCollection.deleteOne(buildIdFilter(challenge._id));
    await userChallengesCollection.deleteMany({ challengeId: challenge._id });

    res.json({ message: "Challenge removed successfully" });
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  createChallenge,
  deleteChallenge,
  getChallengeById,
  getChallenges,
  joinChallenge,
  updateChallenge,
};
