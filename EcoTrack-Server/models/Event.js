const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required']
  },
  organizer: {
    type: String,
    required: true
  },
  maxParticipants: {
    type: Number,
    default: 50,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String
  },
  isVirtual: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Add index for date queries
eventSchema.index({ date: 1 });

module.exports = mongoose.model('Event', eventSchema);