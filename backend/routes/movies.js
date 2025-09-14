const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');

// @route   GET /api/movies
// @desc    Get all movies (with search functionality)
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search || ''; // Get search query from URL

    // Create a query object. If there's a search term, find movies by title.
    const query = searchQuery
      ? { title: { $regex: searchQuery, $options: 'i' } } // 'i' for case-insensitive
      : {};

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/movies/:id
// @desc    Get a single movie by its ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/movies
// @desc    Add a new movie (accessible to any logged-in user)
router.post('/', auth, async (req, res) => {
  try {
    const { title, genre, releaseYear, synopsis } = req.body;

    const newMovie = new Movie({
      title,
      genre,
      releaseYear,
      synopsis,
    });

    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/movies/:id/reviews
// @desc    Add a review to a movie (Protected Route)
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }

    const newReview = {
      userId: req.user.id,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
    };

    movie.reviews.unshift(newReview);

    await movie.save();

    res.status(201).json(movie.reviews);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;