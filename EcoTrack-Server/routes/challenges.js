const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getChallenges,
  getChallengeById,
  createChallenge,
  joinChallenge,
  updateChallenge,
  deleteChallenge
} = require('../controllers/challengeController');

// Public routes
router.get('/', getChallenges);
router.get('/:id', getChallengeById);

// Protected routes
router.post('/', protect, createChallenge);
router.post('/join/:id', protect, joinChallenge);
router.patch('/:id', protect, updateChallenge);
router.put('/:id', protect, updateChallenge);
router.delete('/:id', protect, deleteChallenge);

module.exports = router;