const Boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CommonHelper = require('./CommonHelper');
const Database = require('../services/Database');

const register = async (req) => {
  const { name, email, password } = req.body;
  // check email exist
  const countUser = await Database.getUser(email);
  if (countUser.length > 0) {
    return Boom.conflict(`User with email ${email} already exists `);
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Database.register(name, email, hashPassword);
    return `User ${email} has been registered`;
  } catch (error) {
    CommonHelper.log(['Auth Helper', 'register', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email exist
    const countUser = await Database.getUser(email);
    if (countUser.length === 0) {
      return Boom.notFound(`User with email ${email} not found `);
    }
    // compare password
    const match = await bcrypt.compare(password, countUser[0].password);
    if (!match) {
      return Boom.unauthorized('Invalid email or password');
    }
    const { id, name, email: userEmail } = countUser[0];
    // create token
    const accessToken = await jwt.sign({ id, name, userEmail }, process.env.ACCESS_TOKEN, {
      expiresIn: '20s'
    });
    const refreshToken = await jwt.sign({ id, name, userEmail }, process.env.REFRESH_TOKEN, {
      expiresIn: '1d'
    });
    // update refresh token
    await Database.updateToken(id, refreshToken);
    // set cookie
    await res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1day
    });
    return accessToken;
  } catch (error) {
    CommonHelper.log(['Auth Helper', 'login', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = {
  register,
  login
};
