const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Waste Management', 'Energy Saving', 'Water Conservation', 'Sustainable Living', 'Transportation', 'Food & Garden'],
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1556742049-0cfb4d4a5a?w=400&h=300&fit=crop'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for formatted date
tipSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt ? this.createdAt.toLocaleDateString() : '';
});

// Add virtual for time ago
tipSchema.virtual('timeAgo').get(function() {
  if (!this.createdAt) return '';
  const now = new Date();
  const diffMs = now.getTime() - this.createdAt.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffDays > 0) {
    return `${diffDays} days ago`;
  } else if (diffHours > 0) {
    return `${diffHours} hours ago`;
  } else if (diffMins > 0) {
    return `${diffMins} minutes ago`;
  } else {
    return 'Just now';
  }
});

const Tip = mongoose.model('Tip', tipSchema);

module.exports = Tip;
