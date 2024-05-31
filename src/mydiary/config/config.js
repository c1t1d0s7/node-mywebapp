require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  database: {
    name: process.env.DATABASE_NAME || 'mydiary',
    user: process.env.DATABASE_USER || 'myuser',
    password: process.env.DATABASE_PASSWORD || 'P@ssw0rd',
    host: process.env.DATABASE_HOST || 'mydb',
    port: process.env.DATABASE_PORT || 3306,
  },
};
