import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//defines a route for handling GET requests to the /api/products/slug/:slug endpoint. The :slug part is a route parameter, which means that this endpoint expects a dynamic value to be provided in place of :slug
app.get('/api/products/slug/:slug', (req, res) => {
  // The find method is used to locate the product with a matching slug
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    //This sends the product data as a JSON response to the client, indicating that the product has been found.
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
app.get('/api/products/:id', (req, res) => {
  // The find method is used to locate the product with a matching slug
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    //This sends the product data as a JSON response to the client, indicating that the product has been found.
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
