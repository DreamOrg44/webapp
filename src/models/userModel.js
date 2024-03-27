'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id:{
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey:true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    // primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  account_created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('now'),
  },
  account_updated: {
    type: DataTypes.DATE,
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  timestamps: false,
});

// Hash the received password before saving to the database
User.beforeCreate(async (user) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
});
module.exports = User;


