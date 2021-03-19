const {
  MONGO_URL = 'mongodb://localhost:27017/moviedb',
  JWT_SECRET = 'secret-key',
} = process.env;

module.exports = { MONGO_URL, JWT_SECRET };
