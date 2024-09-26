const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn: '7d'});
  res.status(201).send({ user, token });
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || !await bcrypt.compare(req.body.password, user.password)) {
    return res.status(400).send({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,{expiresIn: '7d'});
  res.send({ user, token });
});



module.exports = router;
