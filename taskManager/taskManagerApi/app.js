const express = require('express');
require('./db/connect');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const taskRoutes = require('./routes/tasks');
const connectDB = require('./db/connect');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);

const url = process.env.MONGO_URI;

const start = async () => {
  try {
    await connectDB(url);
    app.listen(process.env.port, () => {
      console.log('Working');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
