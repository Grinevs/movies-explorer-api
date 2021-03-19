const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then(((data) => res.send(data)))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((data) => res.send(data))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new ValidationError('ошибка валидации'));
      }
      return next(error);
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findOne({ movieId: id })
    .orFail(() => {
      throw new NotFoundError('фильм не найден');
    })
    .then((data) => {
      if (String(req.user._id) === String(data.owner)) {
        Movie.findByIdAndDelete(data._id)
          .then((delmovie) => {
            if (delmovie) {
              return res.send(delmovie);
            }
            throw new NotFoundError('фильм не найден!');
          })
          .catch(next);
      } else {
        throw new ForbiddenError('нет доступа!');
      }
    })
    .catch((next));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
