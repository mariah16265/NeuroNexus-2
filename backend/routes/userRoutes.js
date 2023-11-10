import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { generateToken } from '../utils.js';
const userRouter = express.Router();
//sets up a route in an Express.js application to handle HTTP POST requests to the '/signin' endpoint
userRouter.post(
  '/signin',
  //expressAsyncHanlder: used to handle errors in asynchronous functions.
  expressAsyncHandler(async (req, res) => {
    //It attempts to find a user by their email in the database:
    const user = await User.findOne({ email: req.body.email });
    //Checks if a user with the provided email was found and if the provided password matches the stored password:
    if (user) {
      //compareSync :is a method provided by bcrypt that is used for comparing a plain text password with a hashed password.
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //If the user exists and the password is correct, it sends a response
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Inavlid email or password!' });
  })
);
userRouter.post(
  //sets up a route for handling HTTP POST requests to the '/signup' endpoint.
  //expressAsyncHandler. This utility function helps to handle errors in asynchronous Express route handlers.
  '/signup',
  expressAsyncHandler(async (req, res) => {
    //new instance of the User model
    // The user information is taken from the request body (req.body). It includes the user's name, email, and a hashed version of the password. The password is hashed synchronously using bcrypt.hashSync.
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    // new user instance is saved to the database using the save method
    const user = await newUser.save();
    //A JSON response is sent back to the client. It includes the user's information such as their _id, name, email, isAdmin status, and a token.
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);
export default userRouter;
