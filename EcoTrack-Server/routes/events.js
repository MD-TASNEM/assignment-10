const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  joinEvent
} = require('../controllers/eventController');

// Public routes
router.get('/', getEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, createEvent);
router.post('/:id/join', protect, joinEvent);

module.exports = router;