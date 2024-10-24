const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const bureaucratRoutes = require('./routes/bureaucratRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://localhost/bureaucrat_reviews_db";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/bureaucrats', bureaucratRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
