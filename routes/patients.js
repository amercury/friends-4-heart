const express = require('express');
const router = express.Router();
const { Patient } = require('../models/Patient');
const { Questions } = require('../models/Questions');
const auth = require('../middleware/auth')

router.get('/new', auth, async (req, res) => {
  const questions = await Questions.find()
  res.render('newPatient', {
    questions
  })
});

router.get('/change/:id', auth, async (req, res) => {
  const id = req.params.id
  const patient = await Patient.findById({ _id: id })
  res.render('newPatient', {
    patient
  })
});

router.delete('/change/:id', auth, async (req, res) => {
  const id = req.params.id
  try {
    await Patient.findOneAndRemove({ _id: id })
    res.redirect('/')
  } catch (error) {
    res.json({ message: "cant remove" })
  }
});

router.put('/change/:id', auth, async (req, res) => {
  const id = req.params.id
  const { name, age, disease, form } = req.body
  try {
    await Patient.findOneAndUpdate({ _id: id }, {
      name,
      age,
      disease,
      form
    })
    res.redirect('/')
  } catch (error) {
    res.json({ message: "cant change" })
  }

});

module.exports = router;
