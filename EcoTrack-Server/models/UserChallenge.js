const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
    index: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Not Started', 'Ongoing', 'Finished', 'Paused', 'Abandoned'],
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
    default: Date.now,
    required: true
  },
  completedDate: {
    type: Date
  },
  lastActivityDate: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  milestones: [{
    day: {
      type: Number,
      required: true,
      min: 1
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedDate: {
      type: Date
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200
    }
  }],
  achievements: [{
    type: {
      type: String,
      required: true,
      enum: ['First Day', 'Week Complete', 'Halfway Point', 'Final Day', 'Perfect Score', 'Early Finisher', 'Consistent Participant']
    },
    earnedDate: {
      type: Date,
      default: Date.now
    },
    points: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  impactMetrics: {
    co2Saved: {
      type: Number,
      default: 0,
      min: 0
    },
    plasticReduced: {
      type: Number,
      default: 0,
      min: 0
    },
    waterSaved: {
      type: Number,
      default: 0,
      min: 0
    },
    treesEquivalent: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  reminderSettings: {
    daily: {
      type: Boolean,
      default: true
    },
    weekly: {
      type: Boolean,
      default: true
    },
    milestone: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for formatted dates
userChallengeSchema.virtual('formattedJoinDate').get(function() {
  return this.joinDate ? this.joinDate.toLocaleDateString() : '';
});

userChallengeSchema.virtual('formattedCompletedDate').get(function() {
  return this.completedDate ? this.completedDate.toLocaleDateString() : '';
});

// Add virtual for days active
userChallengeSchema.virtual('daysActive').get(function() {
  if (!this.joinDate) return 0;
  const now = new Date();
  const diffMs = now.getTime() - this.joinDate.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
});

// Add virtual for streak
userChallengeSchema.virtual('currentStreak').get(function() {
  if (!this.milestones || this.milestones.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  
  // Count consecutive days from the end
  for (let i = this.milestones.length - 1; i >= 0; i--) {
    const milestone = this.milestones[i];
    if (milestone.completed) {
      const milestoneDate = new Date(milestone.completedDate);
      const diffDays = Math.floor((today.getTime() - milestoneDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays <= streak) {
        streak++;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  return streak;
});

// Add virtual for completion percentage
userChallengeSchema.virtual('completionPercentage').get(function() {
  if (!this.milestones || this.milestones.length === 0) return this.progress;
  
  const completedMilestones = this.milestones.filter(m => m.completed).length;
  return Math.round((completedMilestones / this.milestones.length) * 100);
});

// Add virtual for is overdue
userChallengeSchema.virtual('isOverdue').get(function() {
  if (!this.challengeId) return false;
  
  // This would need to be populated with the challenge data
  // For now, return false
  return false;
});

// Compound index for user+challenge uniqueness
userChallengeSchema.index({ userId: 1, challengeId: 1 }, { unique: true });

const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);

module.exports = UserChallenge;
