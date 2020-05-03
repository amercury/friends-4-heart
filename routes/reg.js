const express = require('express');

const router = express.Router();
const { User } = require('../models/models');

/* POST reg page. */
router.post('/', async (req, res) => {
  const { username, password, passwordRep } = req.body;
  if (password === passwordRep) {
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
  }
  res.redirect('/');
});

module.exports = router;
