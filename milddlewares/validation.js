const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().min(2),
  }).unknown(true),
});

const validationUserPatch = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2),
  }).unknown(true),
});

const validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3).max(30),
    director: Joi.string().required().min(3).max(30),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(3).max(3000),
    image: Joi.string().required().custom((value) => validator.isURL(value) && value),
    trailer: Joi.string().required().custom((value) => validator.isURL(value) && value),
    thumbnail: Joi.string().required().custom((value) => validator.isURL(value) && value),
    nameRU: Joi.string().required().min(3).max(50),
    nameEN: Joi.string().required().min(3).max(50),
    duration: Joi.number().required().max(500),
    movieId: Joi.number().required().max(500),
  }).unknown(true),
});

const validationRegex = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).regex(/^[0-9a-f]+$/),
  }).unknown(true),
});

module.exports = {
  validationUser, validationMovie, validationRegex, validationUserPatch,
};
