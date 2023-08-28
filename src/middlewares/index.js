const loginMiddleware = require('./login.midleware');
const userMiddleware = require('./user.midleware');
const authenticate = require('./authenticator.middleware');
const categoryMiddleware = require('./category.middlwares');

module.exports = {
  loginMiddleware,
  userMiddleware,
  authenticate,
  categoryMiddleware,
};