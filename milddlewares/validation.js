const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
// const ValidationError = require('../errors/validation-error');

const validationUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({ 'any.required': 'Поле не заполнено' }),
    password: Joi.string().required().min(3).messages({ 'any.required': 'Поле не заполнено' }),
    name: Joi.string().min(2),
  }).unknown(true),
});

const validationUserPatch = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().messages({ 'any.required': 'Поле не заполнено' }),
    name: Joi.string().min(2).messages({ 'any.required': 'Поле не заполнено' }),
  }).unknown(true),
});

const validationMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3).max(30)
      .messages({ 'any.required': 'Поле не заполнено' }),
    director: Joi.string().required().min(3).max(30)
      .messages({ 'any.required': 'Поле не заполнено' }),
    year: Joi.string().required().min(4).max(4)
      .messages({ 'any.required': 'Поле не заполнено' }),
    description: Joi.string().required().min(3).max(3000)
      .messages({ 'any.required': 'Поле не заполнено' }),
    image: Joi.string().required().custom((value) => validator.isURL(value) && value).messages({ 'any.required': 'Поле не заполнено' }),
    trailer: Joi.string().required().custom((value) => validator.isURL(value) && value).messages({ 'any.required': 'Поле не заполнено' }),
    thumbnail: Joi.string().required().custom((value) => validator.isURL(value) && value).messages({ 'any.required': 'Поле не заполнено' }),
    nameRU: Joi.string().required().min(3).max(50)
      .messages({ 'any.required': 'Поле не заполнено' }),
    nameEN: Joi.string().required().min(3).max(50)
      .messages({ 'any.required': 'Поле не заполнено' }),
    duration: Joi.number().required().max(500).messages({ 'any.required': 'Поле не заполнено' }),
    movieId: Joi.number().required().max(500).messages({ 'any.required': 'Поле не заполнено' }),
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
