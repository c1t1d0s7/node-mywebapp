// models.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db_connection');

const diaryEntries = sequelize.define(
  "diaryentries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    weather: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: new Date().toLocaleString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
    },
  }
);

let createTableAttempts = 0;

function createTable(attempts) {
  sequelize.sync()
    .then(() => {
      console.log('DiaryEntries table created successfully!');
    })
    .catch((error) => {
      console.error('Unable to create table:', error);
      console.log(`Retrying in 5 seconds... (attempt ${createTableAttempts}/15)`);
      if (createTableAttempts < attempts) {
        createTableAttempts++;
        setTimeout(createTable, 5000);
      }
    });
}

createTable(15);

module.exports = diaryEntries;
