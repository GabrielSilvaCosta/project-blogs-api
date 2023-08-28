const express = require('express');
const getCategory = require('../controllers/category.controler');

const { authenticate } = require('../middlewares');

const router = express.Router();

router.post('/', authenticate, getCategory.getCategory);
router.get('/', authenticate, getCategory.getAllCategories);

module.exports = router;
