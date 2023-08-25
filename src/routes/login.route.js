const express = require('express');
const { loginController } = require('../controllers');
const { loginMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', loginMiddleware.validateFields, loginController.login);

module.exports = router;