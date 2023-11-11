import jwt, { decode } from 'jsonwebtoken';
export const generateToken = (user) => {
  //jwt.sign method to create a new JWT.
  return jwt.sign(
    {
      //The first argument is the payload, an object containing user information
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    //The second argument is the secret key used to sign the token.
    process.env.JWT_SECRET,
    {
      //The third argument is an options object that includes the expiration time for the token
      expiresIn: '30d',
    }
  );
};
//This function is a middleware used to check if a user is authenticated by verifying the provided JWT.
// //req: The request object.
// res: The response object.
// next: The next middleware function in the Express middleware chain.

export const isAuth = (req, res, next) => {
  //It first checks if the request contains an Authorization header.
  const authorization = req.headers.authorization;
  //If the header is present, it extracts the token from the header (assuming it follows the "Bearer <token>" format) and removes the "Bearer " prefix.
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    //jwt.verify to verify the token with the secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      //If verification fails, it sends a 401 (Unauthorized) response with a 'Invalid Token' message.
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        //decode: decrypted version of token that includes userInfo
        req.user = decode;
        //Finally, it calls next() to pass control to the next middleware in the chain.
        next();
      }
    });
  }
  //If the request is not authenticated (due to missing or invalid token), it sends a 401 response.
  else {
    res.status(401).send({ message: 'No Token' });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};
