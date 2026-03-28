const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true
  },
  status: {
    type: String,
    enum: ['Not Started', 'Ongoing', 'Finished'],
    default: 'Not Started'
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate joins
userChallengeSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

// Pre-save middleware to set completion date when progress reaches 100
userChallengeSchema.pre('save', function(next) {
  if (this.progress >= 100 && this.status !== 'Finished') {
    this.status = 'Finished';
    this.completionDate = new Date();
  } else if (this.progress > 0 && this.status === 'Not Started') {
    this.status = 'Ongoing';
  }
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('UserChallenge', userChallengeSchema);