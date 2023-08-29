const loginMiddleware = require('./login.midleware');
const userMiddleware = require('./user.midleware');
const authenticate = require('./authenticator.middleware');
const categoryMiddleware = require('./category.middlwares');
const blogPostMiddleware = require('./post.middlewares');

module.exports = {
  loginMiddleware,
  userMiddleware,
  authenticate,
  categoryMiddleware,
  blogPostMiddleware,
};