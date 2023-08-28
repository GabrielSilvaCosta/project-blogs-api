const express = require('express');
const { userController } = require('../controllers');
const { userMiddleware, authenticate } = require('../middlewares');

const router = express.Router();

router.post('/', userMiddleware.validateUser, userController.saveUser);
router.get('/', authenticate, userController.getAll);
router.get('/:id', authenticate, userController.getUser);

module.exports = router;