const { COLLECTIONS, getCollection } = require("../config/db");
const { getErrorResponse } = require("../utils/errors");
const {
  prepareTipDocument,
  serializeDocuments,
} = require("../utils/entities");
const { buildIdFilter, findById, serializeDocument } = require("../utils/mongo");

const getTipsCollection = () => getCollection(COLLECTIONS.tips);

const parsePositiveInteger = (value, defaultValue) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return defaultValue;
  }

  return parsed;
};

// @desc    Get all tips
// @route   GET /api/tips
const getTips = async (req, res) => {
  try {
    const limit = Math.min(parsePositiveInteger(req.query.limit, 10), 100);
    const tips = await getTipsCollection()
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    res.json(serializeDocuments(tips));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Get recent tips for homepage
// @route   GET /api/tips/recent
const getRecentTips = async (req, res) => {
  try {
    const tips = await getTipsCollection()
      .find({})
      .project({
        title: 1,
        content: 1,
        category: 1,
        authorName: 1,
        upvotes: 1,
        createdAt: 1,
        imageUrl: 1,
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    res.json(serializeDocuments(tips));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Create a tip
// @route   POST /api/tips
const createTip = async (req, res) => {
  try {
    const tipDocument = prepareTipDocument(req.body, {
      author: req.user.email,
      authorName: req.user.name,
    });
    const insertResult = await getTipsCollection().insertOne(tipDocument);
    const savedTip = tipDocument._id
      ? tipDocument
      : { ...tipDocument, _id: insertResult.insertedId };

    res.status(201).json(serializeDocument(savedTip));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error, 400);
    res.status(statusCode).json({ message });
  }
};

// @desc    Upvote a tip
// @route   PATCH /api/tips/:id/upvote
const upvoteTip = async (req, res) => {
  try {
    const tipsCollection = getTipsCollection();
    const tip = await findById(tipsCollection, req.params.id);

    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    const updatedTip = {
      ...tip,
      upvotes: Number(tip.upvotes || 0) + 1,
      updatedAt: new Date(),
    };
    const { _id, createdAt, ...tipChanges } = updatedTip;

    await tipsCollection.updateOne(buildIdFilter(tip._id), {
      $set: tipChanges,
    });

    res.json({
      message: "Tip upvoted successfully",
      upvotes: updatedTip.upvotes,
      tip: serializeDocument({
        ...tip,
        ...tipChanges,
        _id: tip._id,
        createdAt: tip.createdAt || createdAt,
      }),
    });
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  createTip,
  getRecentTips,
  getTips,
  upvoteTip,
};
