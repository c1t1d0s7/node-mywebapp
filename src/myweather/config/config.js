require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  weatherService: process.env.WEATHER_SERVICE || 'wttr.in',
};
