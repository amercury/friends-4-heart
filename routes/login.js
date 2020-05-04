const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const { User } = require('../models/user');

/* POST login page. */
router.post('/', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    req.session.user = {
      name: user.name,
      id: user._id,
      email: user.email,
      patients: user.patients,
    };

    req.session.auth = true;
    return res.json({
      success: true,
    });
  }
  return res.json({
    success: false,
    err: 'Wrong data',
  });
});

module.exports = router;
