const express = require('express');

const router = express.Router();

/* GET home page. */

router.get('/', async (req, res) => {
  if (req.session.auth) {
    return res.redirect('/profile/');
    // const { id } = req.session.user;
    // const patients = await User.findById({ _id: id }).populate('patients');
    // return res.render('profile', { patients });
  }

  res.render('index', {});
});


module.exports = router;
