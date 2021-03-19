const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./milddlewares/rateLimiter');
const router = require('./routes/index.js');
const { requestLogger, errorLogger } = require('./milddlewares/logger');
const errorHandler = require('./milddlewares/errorHandler');
const { MONGO_URL } = require('./config');

const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
