const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const dontenv=require("dotenv").config()

const authenticate = async (req, res, next) => {
 /* console.log("Body",req.body)
  console.log("header",req.header)*/
  const token = req.header('Authorization').replace('Bearer', '').trim();
  console.log("Received Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET,{ expiresIn: '7d' });
    console.log("Decoded Token:", decoded)
  const user = await User.findOne({ _id: decoded._id });
  if (!user) {
    throw new Error('Please authenticate');
  }
  req.user = user;
  next();
};

module.exports = authenticate;
