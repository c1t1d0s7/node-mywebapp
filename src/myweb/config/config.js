require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  myapp: {
    host: process.env.MYAPP_HOST || 'myapp',
    port: process.env.MYAPP_PORT || 3000,
  },
  mydiary: {
    host: process.env.MYDIARY_HOST || 'mydiary',
    port: process.env.MYDIARY_PORT || 3000,
  }
};
