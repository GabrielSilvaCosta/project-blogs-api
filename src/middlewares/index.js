const loginMiddleware = require('./login.midleware');
const userMiddleware = require('./user.midleware');
const authenticate = require('./authenticator.middleware');

module.exports = {
  loginMiddleware,
  userMiddleware,
  authenticate,
};