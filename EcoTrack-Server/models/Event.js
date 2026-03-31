const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  organizer: {
    type: String,
    required: true,
    trim: true
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Community Cleanup', 'Workshop', 'Webinar', 'Tree Planting', 'Conservation', 'Sustainable Living', 'Transportation'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1556742049-0cfb4d4a5a?w=800&h=600&fit=crop'
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  cost: {
    type: Number,
    default: 0,
    min: 0
  },
  requirements: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for formatted date
eventSchema.virtual('formattedDate').get(function() {
  return this.date ? this.date.toLocaleDateString() : '';
});

// Add virtual for formatted time
eventSchema.virtual('formattedTime').get(function() {
  return this.date ? this.date.toLocaleTimeString() : '';
});

// Add virtual for spots left
eventSchema.virtual('spotsLeft').get(function() {
  return Math.max(0, this.maxParticipants - this.currentParticipants);
});

// Add virtual for registration status
eventSchema.virtual('registrationStatus').get(function() {
  if (this.currentParticipants >= this.maxParticipants) {
    return 'Full';
  } else if (this.currentParticipants === 0) {
    return 'Open';
  } else {
    return 'Open';
  }
});

// Add virtual for is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return this.date && this.date > new Date();
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
