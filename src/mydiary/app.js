// Import necessary modules
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config');

const myDiaryRouter = require('./routes/myDiaryRouter');
const healthCheckRouter = require('./routes/healthCheckRouter');

// Initialize Express app
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(morgan('combined')); // HTTP request logger

// Routes setup
app.use('/diary', myDiaryRouter); // mydiary routes
app.use('/healthcheck', healthCheckRouter); // healthcheck routes

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
