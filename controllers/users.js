const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AlreadyExistError = require('../errors/alreadyExistError');
const AuthError = require('../errors/auth-error');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const { JWT_SECRET } = require('../config');

const createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => res.send({
      password: data.password,
      name: data.name,
      email: data.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new AlreadyExistError('Совпадают Email адреса'));
      }
      return next(err);
    });
};

let userId;

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Неправильные почта или пароль');
      }
      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthError('Неправильные почта или пароль');
      }
      const token = jwt.sign(
        { _id: userId },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      return res.send({ token });
    })
    .catch((next));
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Юзер не найден');
    })
    .catch((next));
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!(name && email)) {
    throw new ValidationError('Поля не заполнены');
  }

  User.find({ email })
    .then((data) => {
      if (data.length >= 1) {
        next(new AlreadyExistError('Совпадают Email адреса'));
      } else {
        User.findByIdAndUpdate(req.user._id, { name, email },
          {
            new: true,
            runValidators: true,
          })
          .orFail(() => {
            throw new NotFoundError('Юзер не найден');
          })
          .then((user) => {
            if (user) {
              return res.send(user);
            }
            throw new NotFoundError('Юзер не найден');
          })
          .catch((next));
      }
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
};
