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
export default userRouter;
