const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'pranto', {
  host: 'localhost',
  port: 3001,
  dialect: 'mysql',
});

module.exports = sequelize;