const router = require('express').Router();
const express = require('express');
const { validationUser } = require('../milddlewares/validation');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../milddlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');

const jsonParser = express.json();

router.post('/signup',
  jsonParser,
  validationUser,
  createUser);

router.post('/signin',
  jsonParser,
  validationUser,
  login);

router.use(auth);

router.use('/', moviesRouter, usersRouter);

router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
