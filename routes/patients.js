const express = require('express');

const router = express.Router();
const Patient = require('../models/patient');
const Questions = require('../models/question');
const { User } = require('../models/user');
const auth = require('../middleware/auth');

router.get('/new', auth, async (req, res) => {
  const questions = await Questions.find();
  res.render('newPatient', {
    questions,
  });
});

router.post('/', auth, async (req, res) => {
  const { diagnosis, name, test } = req.body;

  const recomends = [];
  for (let i = 0; i < test.length; i += 1) {
    const ans = await Questions.findById(test[i].id);
    recomends.push(test[i].value ? ans.answerTrue : ans.answerFalse);
  }
  const newPatient = new Patient({
    name,
    diagnosis,
    reccomends: recomends,
  });
  await newPatient.save();
  const user = await User.findById(req.session.user.id);
  user.patients.push(newPatient.id);
  await user.save();
  res.json({
    success: true,
  });

});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById({ _id: id });
  res.render('newPatient', { patient });
});

router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Patient.findOneAndRemove({ _id: id });
    res.redirect('/');
  } catch (error) {
    res.json({ message: 'cant remove' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const {
    name, age, disease, form,
  } = req.body;
  try {
    await Patient.findOneAndUpdate({ _id: id }, {
      name,
      age,
      disease,
      form,
    });
    res.redirect('/');
  } catch (error) {
    res.json({ message: 'cant change' });
  }
});

module.exports = router;
