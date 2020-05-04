const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();

/* GET home page. */

router.get('/', auth, async (req, res) => {
  const id = req.session.user.id
  const Patients = await User.findById({ _id: id }).populate('patients')

  res.render('index', {
    Patients,
    isName: req.session.user.name
  })

})

module.exports = router;
