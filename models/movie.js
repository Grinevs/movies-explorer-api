const mongoose = require('mongoose');
const validator = require('validator');
const ValidationError = require('../errors/validation-error');

const movieSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'country',
    required: true,
  },
  director: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'director',
    required: true,
  },
  year: {
    type: String,
    minlength: 4,
    maxlength: 4,
    default: '1900',
    required: true,
  },
  description: {
    type: String,
    minlength: 2,
    maxlength: 3000,
    default: 'description',
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        if (validator.isURL(v)) {
          return v;
        }
        throw new ValidationError('некорректная ссылка');
      },
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        if (validator.isURL(v)) {
          return v;
        }
        throw new ValidationError('некорректная ссылка');
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        if (validator.isURL(v)) {
          return v;
        }
        throw new ValidationError('некорректная ссылка');
      },
    },
  },
  duration: {
    type: Number,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  nameEN: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
