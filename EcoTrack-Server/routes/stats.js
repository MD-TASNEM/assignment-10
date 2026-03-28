const express = require('express');
const router = express.Router();
const {
  getCommunityStats,
  getLeaderboard
} = require('../controllers/statsController');

// Public routes
router.get('/community', getCommunityStats);
router.get('/leaderboard', getLeaderboard);

module.exports = router;