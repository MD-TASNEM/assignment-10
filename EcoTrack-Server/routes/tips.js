const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTips,
  getRecentTips,
  createTip,
  upvoteTip
} = require('../controllers/tipController');

// Public routes
router.get('/', getTips);
router.get('/recent', getRecentTips);

// Protected routes
router.post('/', protect, createTip);
router.patch('/:id/upvote', protect, upvoteTip);

module.exports = router;