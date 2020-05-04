const mongoose = require('mongoose');
const bcrtypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  ],
});

userSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrtypt.hashSync(this.password, 12);
  }
  next();
});
const User = mongoose.model('User', userSchema);
module.exports = { User };
