const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const AuthHelper = require('../helpers/AuthHelper');
const ValidationHelper = require('../helpers/ValidationHelper');

const register = async (req, res) => {
  try {
    ValidationHelper.registerValidation(req.body);
    const data = await AuthHelper.register(req);
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Register', 'Register', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const login = async (req, res) => {
  try {
    ValidationHelper.loginValidation(req.body);
    const responses = await AuthHelper.login(req, res);
    return res.send(responses);
  } catch (error) {
    CommonHelper.log(['Login', 'Login', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.post('/register', CommonHelper.preHandler, register);
router.post('/login', CommonHelper.preHandler, login);

module.exports = router;
