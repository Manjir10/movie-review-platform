const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/users/register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user and get token
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST /api/users/watchlist/:movieId
// @desc    Add a movie to user's watchlist
router.post('/watchlist/:movieId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.watchlist.includes(req.params.movieId)) {
      return res.status(400).json({ msg: 'Movie already in watchlist' });
    }
    user.watchlist.push(req.params.movieId);
    await user.save();
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/users/watchlist
// @desc    Get user's watchlist
router.get('/watchlist', auth, async (req, res) => {
  try {
    // --- THIS IS THE CORRECTED PART ---
    const user = await User.findById(req.user.id).populate({
        path: 'watchlist',
        model: 'Movie'
    });
    // ---------------------------------
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.watchlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/watchlist/:movieId
// @desc    Remove a movie from user's watchlist
router.delete('/watchlist/:movieId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.watchlist = user.watchlist.filter(
            (movieId) => movieId.toString() !== req.params.movieId
        );
        await user.save();
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;