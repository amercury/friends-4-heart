const express = require('express');

const router = express.Router();
const Question = require('../models/question');


router.get('/all', async (req, res) => {
  const questions = await Question.find();
  try {
    res.json({
      questions,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById({ _id: id });
  try {
    res.json({
      question,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;
