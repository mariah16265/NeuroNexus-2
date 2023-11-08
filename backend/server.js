import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
//to fetch variables in env file
dotenv.config();
//connect to database
//returns a promise

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
