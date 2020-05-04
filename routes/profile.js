const express = require('express');
const auth = require('../middleware/auth');
const { User } = require('../models/user');
const Patient = require('../models/patient');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const { id } = req.session.user;
  const user = await User.findById({ _id: id }).populate('patients');
  const { patients } = user;
  res.render('userProfile', { patients });
});

router.get('/patient/:id', auth, async (req, res) => {
  if (req.user.patients.contains(req.params.id)) {
    const patient = Patient.findById(req.params.id);
    return res.render('patientProfile', { patient });
  }
  return res.redirect('/');
});

module.exports = router;
