const router = require('express').Router();
const express = require('express');
const { validationUserPatch } = require('../milddlewares/validation');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

const jsonParser = express.json();

router.get('/users/me', getUser);
router.patch('/users/me', jsonParser, validationUserPatch, updateUser);

module.exports = router;
