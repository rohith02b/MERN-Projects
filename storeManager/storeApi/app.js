const express = require('express');
require('dotenv').config();
const app = express();
const connectDB = require('./dbConnect');
const productRoutes = require('./routes/productRoutes');
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

//routes
app.use('/api/v1/products', productRoutes);

// listener
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log('Working');
    });
  } catch (error) {
    res.json(error);
  }
};

start();
