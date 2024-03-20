// controllers/UserController.js

const User = require('../models/userModel');
const { getCurrentDate } = require('../utils/dateUtils'); // Adjust the path
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');


async function createUser(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format, kindly follow email based username.' });
    }
    const newUser = await User.create({ email, password, firstName, lastName, account_created: getCurrentDate(), });
    res.status(201).json({ id: newUser.id, email: newUser.email, firstName, lastName, account_created: newUser.account_created, account_updated: newUser.account_updated });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'User with this email already exists' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}
async function updateUser(req, res) {
  try {
    const { firstName, lastName, password } = req.body;
    if ('account_created' in req.body || 'account_updated' in req.body || 'email' in req.body) {
      return res.status(400).json({ error: 'Invalid fields provided for update' });
    }

    let updateFields = { firstName, lastName, account_updated: new Date() };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    const updatedUser = await User.update(updateFields,
      { where: { id: req.user.id } } 
    );

    if (updatedUser[0] === 1) {
      logger.info('User information updated successfully');
      res.status(204).json({ message: 'User information updated successfully' });
    } else {
      logger.error(' User not found or invalid fields provided for update');
      res.status(400).json({ error: 'User not found or invalid fields provided for update' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserInfo(req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  createUser,
  updateUser,
  getUserInfo,
};

