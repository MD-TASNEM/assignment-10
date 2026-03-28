const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getUserChallenges,
  updateProgress,
  getUserStats
} = require('../controllers/userChallengeController');

// All routes are protected
router.use(protect);

router.get('/', getUserChallenges);
router.get('/stats', getUserStats);
router.patch('/:challengeId/progress', updateProgress);

module.exports = router;