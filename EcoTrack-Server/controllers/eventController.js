const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
const getEvents = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(limit);

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get upcoming events for homepage
// @route   GET /api/events/upcoming
const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(4)
      .select('title date location description');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/events
const createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      organizer: req.user.email
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Join an event
// @route   POST /api/events/:id/join
const joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.currentParticipants >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is already full' });
    }

    event.currentParticipants += 1;
    await event.save();

    res.json({ message: 'Successfully joined the event', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  joinEvent
};