const mongoose = require('mongoose');
const validator = require('validator');
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'User',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'некорректный Email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

}, { versionKey: false });

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
