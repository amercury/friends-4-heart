const mongoose = require('mongoose');


const questionSchema = mongoose.Schema({
  question: {
    type: String,
  },
  answerTrue: [
    {
      type: String,
    },
  ],
  answerFalse: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('Question', questionSchema);
