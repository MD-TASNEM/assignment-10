const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Challenge title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Waste Reduction', 'Energy Conservation', 'Water Conservation', 'Sustainable Transport', 'Green Living', 'Others']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Duration must be at least 1 day'],
    max: [365, 'Duration cannot exceed 365 days']
  },
  target: {
    type: String,
    required: [true, 'Target is required']
  },
  participants: {
    type: Number,
    default: 0
  },
  impactMetric: {
    type: String,
    default: 'kg CO₂ saved'
  },
  createdBy: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Eco+Challenge'
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Active', 'Completed'],
    default: 'Upcoming'
  }
}, {
  timestamps: true
});

// Pre-save middleware to set status based on dates
challengeSchema.pre('save', function(next) {
  const now = new Date();
  if (now < this.startDate) {
    this.status = 'Upcoming';
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = 'Active';
  } else {
    this.status = 'Completed';
  }
  next();
});

// Virtual for calculating total impact
challengeSchema.virtual('totalImpact').get(function() {
  return this.participants * 10; // Example calculation
});

module.exports = mongoose.model('Challenge', challengeSchema);