const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Waste Reduction', 'Energy Conservation', 'Water Conservation', 'Sustainable Transport', 'Green Living', 'Community Service'],
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  target: {
    type: String,
    required: true,
    trim: true
  },
  participants: {
    type: Number,
    default: 0,
    min: 0
  },
  impactMetric: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1556742049-0cfb4d4a5a?w=800&h=600&fit=crop'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  tags: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    badge: {
      type: String,
      default: ''
    },
    certificate: {
      type: Boolean,
      default: false
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for formatted dates
challengeSchema.virtual('formattedStartDate').get(function() {
  return this.startDate ? this.startDate.toLocaleDateString() : '';
});

challengeSchema.virtual('formattedEndDate').get(function() {
  return this.endDate ? this.endDate.toLocaleDateString() : '';
});

// Add virtual for days remaining
challengeSchema.virtual('daysRemaining').get(function() {
  if (!this.endDate) return 0;
  const today = new Date();
  const diffTime = this.endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Add virtual for progress percentage (based on duration and days passed)
challengeSchema.virtual('progressPercentage').get(function() {
  if (!this.startDate || !this.endDate) return 0;
  const today = new Date();
  const totalTime = this.endDate.getTime() - this.startDate.getTime();
  const timePassed = today.getTime() - this.startDate.getTime();
  return Math.min(100, Math.max(0, Math.round((timePassed / totalTime) * 100)));
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
