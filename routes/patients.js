const express = require('express');

const router = express.Router();
const Patient = require('../models/patient');
const Questions = require('../models/question');
const auth = require('../middleware/auth');

router.get('/new', auth, async (req, res) => {
  const questions = await Questions.find();
  res.render('newPatient', {
    questions,
  });
});

router.post('/', auth, async (req, res) => {
  const { diagnosis, name, test } = req.body;
  const recomends = test.map(async (e) => {
    if (e.value) {
      const q = await Questions.findById(e.id);
      return q.answerTrue;
    }
    const q = await Questions.findById(e.id);
    return q.answerFalse;
  });
  debugger;
});

router.get('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById({ _id: id });
  res.render('newPatient', {
    patient,
  });
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
