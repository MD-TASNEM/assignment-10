const express = require('express');
const router = express.Router();

// Import controllers
const challengeController = require('../controllers/challengeController');
const tipController = require('../controllers/tipController');
const eventController = require('../controllers/eventController');
const userChallengeController = require('../controllers/userChallengeController');
const statsController = require('../controllers/statsController');

// Middleware for authentication (placeholder - implement proper auth middleware)
const authenticateUser = (req, res, next) => {
  // TODO: Implement proper Firebase Admin SDK authentication
  // For now, we'll use a simple middleware
  req.user = {
    uid: 'demo-user',
    email: 'demo@ecotrack.com',
    displayName: 'Demo User'
  };
  next();
};

// Challenge routes
router.get('/challenges', challengeController.getChallenges);
router.get('/challenges/:id', challengeController.getChallengeById);
router.post('/challenges', authenticateUser, challengeController.createChallenge);
router.patch('/challenges/:id', authenticateUser, challengeController.updateChallenge);
router.delete('/challenges/:id', authenticateUser, challengeController.deleteChallenge);
router.post('/challenges/join/:id', authenticateUser, challengeController.joinChallenge);
router.get('/challenges/user/:userId', authenticateUser, challengeController.getUserChallenges);
router.get('/challenges/stats', challengeController.getChallengeStats);

// Tip routes
router.get('/tips', tipController.getTips);
router.get('/tips/:id', tipController.getTipById);
router.post('/tips', authenticateUser, tipController.createTip);
router.patch('/tips/:id', authenticateUser, tipController.updateTip);
router.delete('/tips/:id', authenticateUser, tipController.deleteTip);
router.post('/tips/:id/upvote', authenticateUser, tipController.upvoteTip);
router.get('/tips/user/:userId', authenticateUser, tipController.getUserTips);
router.get('/tips/stats', tipController.getTipStats);

// Event routes
router.get('/events', eventController.getEvents);
router.get('/events/:id', eventController.getEventById);
router.post('/events', authenticateUser, eventController.createEvent);
router.patch('/events/:id', authenticateUser, eventController.updateEvent);
router.delete('/events/:id', authenticateUser, eventController.deleteEvent);
router.post('/events/register/:id', authenticateUser, eventController.registerForEvent);
router.get('/events/user/:userId', authenticateUser, eventController.getUserEvents);
router.get('/events/stats', eventController.getEventStats);

// User Challenge routes
router.get('/user-challenges/:userId', authenticateUser, userChallengeController.getUserChallenges);
router.patch('/user-challenges/:id', authenticateUser, userChallengeController.updateUserChallenge);
router.post('/user-challenges/:id/progress', authenticateUser, userChallengeController.updateProgress);
router.post('/user-challenges/:id/milestone', authenticateUser, userChallengeController.completeMilestone);
router.get('/user-challenges/:id/stats', authenticateUser, userChallengeController.getUserChallengeStats);

// Statistics routes
router.get('/stats/overview', statsController.getOverviewStats);
router.get('/stats/community', statsController.getCommunityStats);
router.get('/stats/leaderboard', statsController.getLeaderboard);
router.get('/stats/impact', statsController.getImpactStats);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'EcoTrack API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('API Error:', err);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

module.exports = router;
