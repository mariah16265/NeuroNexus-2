import express from 'express';
import Product from '../models/productModel.js';

const productRouter = express.Router();
productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
//defines a route for handling GET requests to the /api/products/slug/:slug endpoint. The :slug part is a route parameter, which means that this endpoint expects a dynamic value to be provided in place of :slug
productRouter.get('/slug/:slug', async (req, res) => {
  // The find method is used to locate the product with a matching slug
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    //This sends the product data as a JSON response to the client, indicating that the product has been found.
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRouter.get('/:id', async (req, res) => {
  // The find method is used to locate the product with a matching slug
  const product = await Product.findById(req.params.id);
  if (product) {
    //This sends the product data as a JSON response to the client, indicating that the product has been found.
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
export default productRouter;
