const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
  config.database.name, // database
  config.database.user, // username
  config.database.password, // password
  {
    host: config.database.host, // host
    dialect: 'mysql',
    port: config.database.port,
    logging: console.log,
    pool: {
      max: 3, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000
    },
  },
);

let connectionAttempts = 0;

function connectDatabase(attempts) {
  sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error) => {
      console.error('Unable to connect to the database:', error);
      console.log(`Retrying in 5 seconds... (attempt ${connectionAttempts}/15)`);
      if (connectionAttempts < attempts) {
        connectionAttempts++;
        setTimeout(() => connectDatabase(attempts), 5000);
      }
    });
}

connectDatabase(15);

module.exports = { sequelize };
