const router = require('express').Router();
const express = require('express');
const { validationMovie } = require('../milddlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const jsonParser = express.json();

router.get('/movies', getMovies);
router.post('/movies', jsonParser, validationMovie, createMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;
