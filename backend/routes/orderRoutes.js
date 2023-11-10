import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  //route requires authentication (isAuth), meaning that the user must be logged in to create a new order.
  //expressAsyncHandler. This is a utility function that helps to handle errors in asynchronous Express route handlers.
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //new instance of the Order model
    //with data provided in the request body (req.body).
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });
    //The new order instance is saved to the database using the save method,
    const order = await newOrder.save();
    //The result is then sent as a JSON response with a status code of 201 (indicating that the request was successful, and a resource was created).
    //The response includes a message and the details of the created order.
    res.status(201).send({ message: 'New Order Created', order });
  })
);
orderRouter.get(
  '/:id',
  //route requires authentication (isAuth), meaning that the user must be logged in to create a new order.
  //expressAsyncHandler. This is a utility function that helps to handle errors in asynchronous Express route handlers.
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found!' });
    }
  })
);
orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      //save
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found!' });
    }
  })
);

export default orderRouter;
