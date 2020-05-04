const express = require('express');

const router = express.Router();
const { User } = require('../models/user');

/* POST reg page. */
router.post('/', async (req, res) => {
  const {
    username, email, password, passwordRep,
  } = req.body;
  if (password === passwordRep) {
    const newUser = new User({
      name: username,
      password,
      email,
    });
    await newUser.save();
    return res.json({
      success: true,
    });
  }
  return res.json({
    success: false,
    err: 'try again',
  });
});

module.exports = router;
