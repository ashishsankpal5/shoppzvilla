import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  //token will be sent from frontend (Users Browsers) in the request's header Property
  //in the Authentization property
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not Autherized, Token Failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not Autherizedd,token failedd');
  }
});
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401); //NOT AUTHERISED AS A ADMIN
    throw new Error('NOT AUTHERISED AS A ADMIN');
  }
};
export { protect, admin };
