const { Sequelize } = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING, 
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});


module.exports = Product;