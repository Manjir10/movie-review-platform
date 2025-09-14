const mongoose = require('mongoose');

// A sub-schema for individual reviews
const ReviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  // We embed the reviews directly in the movie document
  reviews: [ReviewSchema]
});

module.exports = mongoose.model('Movie', MovieSchema);