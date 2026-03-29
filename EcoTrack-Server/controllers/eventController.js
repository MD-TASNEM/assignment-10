const { COLLECTIONS, getCollection } = require("../config/db");
const { getErrorResponse } = require("../utils/errors");
const {
  prepareEventDocument,
  serializeDocuments,
} = require("../utils/entities");
const { buildIdFilter, findById, serializeDocument } = require("../utils/mongo");

const getEventsCollection = () => getCollection(COLLECTIONS.events);

const parsePositiveInteger = (value, defaultValue) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return defaultValue;
  }

  return parsed;
};

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const limit = Math.min(parsePositiveInteger(req.query.limit, 10), 100);
    const events = await getEventsCollection()
      .find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(limit)
      .toArray();

    res.json(serializeDocuments(events));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Get upcoming events for homepage
// @route   GET /api/events/upcoming
const getUpcomingEvents = async (req, res) => {
  try {
    const events = await getEventsCollection()
      .find({ date: { $gte: new Date() } })
      .project({
        title: 1,
        date: 1,
        location: 1,
        description: 1,
        organizer: 1,
        imageUrl: 1,
        currentParticipants: 1,
        maxParticipants: 1,
      })
      .sort({ date: 1 })
      .limit(4)
      .toArray();

    res.json(serializeDocuments(events));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await findById(getEventsCollection(), req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(serializeDocument(event));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

// @desc    Create an event
// @route   POST /api/events
const createEvent = async (req, res) => {
  try {
    const eventDocument = prepareEventDocument(req.body, {
      organizer: req.user.email,
    });
    const insertResult = await getEventsCollection().insertOne(eventDocument);
    const savedEvent = eventDocument._id
      ? eventDocument
      : { ...eventDocument, _id: insertResult.insertedId };

    res.status(201).json(serializeDocument(savedEvent));
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error, 400);
    res.status(statusCode).json({ message });
  }
};

// @desc    Join an event
// @route   POST /api/events/:id/join
const joinEvent = async (req, res) => {
  try {
    const eventsCollection = getEventsCollection();
    const event = await findById(eventsCollection, req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (
      Number(event.currentParticipants || 0) >= Number(event.maxParticipants || 0)
    ) {
      return res.status(400).json({ message: "Event is already full" });
    }

    const updatedEvent = {
      ...event,
      currentParticipants: Number(event.currentParticipants || 0) + 1,
      updatedAt: new Date(),
    };
    const { _id, createdAt, ...eventChanges } = updatedEvent;

    await eventsCollection.updateOne(buildIdFilter(event._id), {
      $set: eventChanges,
    });

    res.json({
      message: "Successfully joined the event",
      event: serializeDocument({
        ...event,
        ...eventChanges,
        _id: event._id,
        createdAt: event.createdAt || createdAt,
      }),
    });
  } catch (error) {
    const { statusCode, message } = getErrorResponse(error);
    res.status(statusCode).json({ message });
  }
};

module.exports = {
  createEvent,
  getEventById,
  getEvents,
  getUpcomingEvents,
  joinEvent,
};
