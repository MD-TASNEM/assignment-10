const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tip title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters']
  },
  content: {
    type: String,
    required: [true, 'Tip content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Waste Management', 'Energy Saving', 'Water Conservation', 'Sustainable Transport', 'Green Living', 'Food & Diet']
  },
  author: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String
  }
}, {
  timestamps: true
});

// Add index for better query performance
tipSchema.index({ createdAt: -1 });
tipSchema.index({ upvotes: -1 });

module.exports = mongoose.model('Tip', tipSchema);