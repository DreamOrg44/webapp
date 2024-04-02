// controllers/UserController.js

const User = require('../models/userModel');
const EmailTracking = require('../models/emailTrackingModel')
const { getCurrentDate } = require('../utils/dateUtils'); // Adjust the path
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const { pubMessage } = require('../utils/pubSub');

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';


async function createUser(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Invalid email format entered');
      return res.status(400).json({ error: 'Invalid email format, kindly follow email based username.' });
    }
    const newUser = await User.create({ email, password, firstName, lastName, account_created: getCurrentDate(), });
    if (!isGitHubActions) {
      pubMessage('verify_email', newUser);
    }

    // await pubSubClient.topic('verify_email').publishJSON({ userId: newUser.id, email: newUser.email });

    res.status(201).json({ id: newUser.id, email: newUser.email, firstName, lastName, account_created: newUser.account_created, account_updated: newUser.account_updated });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      logger.error(error, 'User with this email already exists');
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
      logger.warn('Invalid fields provided for updating the data');
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
    logger.error('Error updating user:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserInfo(req, res) {
  try {
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (user) {
      logger.info('User has been found in the system');
      res.status(200).json(user);
    } else {
      logger.error('User has not been found in the system');
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user information:', error);
    logger.error('Error retrieving user information:', error);
    res.status(500).send('Internal Server Error');
  }
}
async function updateUserEmailVerification(req, res) {
  try {
    const token = req.query.token;
    const userId = req.query.userId;
    logger.info("Inside updateUserEmailVerification", token, "and ", userId);
    console.log("Inside updateUserEmailVerification", token, "and ", userId);
    if (!token || !userId) {
      logger.info("User id and token are not provided in request");
      console.log("User id and token are not provided in request");
      return res.status(400).json({ error: 'Token and userId are required' });
    }

    // const timestamp = req.query.timestamp;
    // if (!timestamp) {
    //   logger.warn('Timestamp not provided in request');
    //   console.log("Timestamp not provided in request");
    //   return res.status(400).json({ error: 'Timestamp is required' });
    // }

    // const timestampMs = parseInt(timestamp, 10);

    // const currentTimeMs = Date.now();

    // const differenceMinutes = (currentTimeMs - timestampMs) / (1000 * 60);

    // const expirationLimitMinutes = 2;
    // if (differenceMinutes > expirationLimitMinutes) {
    //   logger.error('Verification link has expired');
    //   console.log("Verification link has expired");
    //   return res.status(403).json({ error: 'Verification link has expired' });
    // }


    const tokenData = await EmailTracking.findOne({ where: { verificationToken: token } });
    if (!tokenData) {
      logger.error("No tokenData found for verification with token:", token, "and userId:", userId);
      console.log("No tokenData found for verification with token:", token, "and userId:", userId);
      return res.status(404).json({ error: 'User not found for verification' });
    }
    else {
      if (
        tokenData.token !== token ||
        Date.now() - tokenData.createdAt.getTime() >
        1, 200, 000
      ) {
        return null;
      }
      else {
        logger.info("User found for verification inside updateUserEmailVerification ", userId);
        console.log("User found for verification inside updateUserEmailVerification ", userId);
        await User.update({ email_verified: true }, { where: { id: userId } });
        return res.status(200).json({ message: 'User email verified successfully' });
      }
    }

  } catch (error) {
    logger.error('Error updating user:', error);
    console.error('Error updating user:', error);
    throw error;
  }
}


module.exports = {
  createUser,
  updateUser,
  getUserInfo,
  updateUserEmailVerification,
};

