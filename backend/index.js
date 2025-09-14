const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

// --- MIDDLEWARE ---
app.use(cors()); // Use cors middleware to allow cross-origin requests
app.use(express.json()); // Middleware to parse JSON bodies

// --- ROUTES ---
app.use('/api/users', require('./routes/users')); 
app.use('/api/movies', require('./routes/movies'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});