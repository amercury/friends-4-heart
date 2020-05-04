const mongoose = require('mongoose');


const patientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  reccomends: [{ text: String, link: String }],
});

module.exports = mongoose.model('Patient', patientSchema);
