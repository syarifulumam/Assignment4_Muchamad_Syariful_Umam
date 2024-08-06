const Boom = require('boom');
const jwt = require('jsonwebtoken');
const CommonHelper = require('../helpers/CommonHelper');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null) return res.send(Boom.unauthorized('Unauthorized'));
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.id = decode.id;
    req.name = decode.name;
    req.email = decode.userEmail;
    next();
  } catch (error) {
    CommonHelper.log(['Verify Token', 'verifyToken', 'ERROR'], {
      message: `${error}`
    });
    return res.send(Boom.forbidden('Forbidden'));
  }
};

module.exports = verifyToken;
