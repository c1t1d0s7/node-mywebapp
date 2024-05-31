const express = require('express');
const fetch = require('node-fetch');
const morgan = require('morgan');
const config = require('./config/config');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Controller
const getWeatherData = async (req, res) => {
    const location = req.params.location || '';
    const url = `http://${config.weatherService}/${location}?format=j1`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const weatherData = await response.json();
        res.json(weatherData);
    } catch (error) {
        console.error('Fetching weather data failed: ', error);
        res.status(500).send('Error fetching weather data');
    }
};

// Routes
app.get('/weather', getWeatherData);
app.get('/weather/:location', getWeatherData);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
