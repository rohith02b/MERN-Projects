const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./connect');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api/v1/auth', authRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log('Working');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
