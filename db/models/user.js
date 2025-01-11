'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require("../../config/database");
const Sequelize = require('sequelize');

const user = sequelize.define('user', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,  
    defaultValue: Sequelize.UUIDV4,  
  },
  userName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
  modelName: 'user',
});


module.exports = user;