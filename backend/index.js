const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT;
const cookieParser = require('cookie-parser');
const app = express();
const morgan = require('morgan');

const connectDB = require('./db/index');

connectDB();

/* Middleware imports */
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

/** define Routes */
const userRoutes = require('./routes/users');
const characterRoutes = require('./routes/characters');
const dungeonRoutes = require('./routes/dungeons');
const monsterRoutes = require('./routes/monsters');

/** Middleware */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Password-Expired',
    ],
    optionsSuccessStatus: 200,
  })
);

/** Wiring in route handlers and mounting routes */
app.use('/api/users', userRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/dungeons', dungeonRoutes);
app.use('/api/monsters', monsterRoutes);

// serve static files
// app.use('public', express.static(PUBLIC_DIR));

const DIR_NAME = path.resolve();

// serve up the application
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(DIR_NAME, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(DIR_NAME, 'frontend', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

/* handle any requests that fall through */
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Express server is running in ${process.env.NODE_ENV} and listening on port: ${PORT}`
  );
});
