const express = require('express');
const { blogPostController } = require('../controllers');
const { authenticate, blogPostMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', authenticate, blogPostMiddleware.validateBlogPost, blogPostController.createPost);
router.get('/', authenticate, blogPostController.getAllPosts);
router.get('/:id', authenticate, blogPostController.getOnePost);
router.put('/:id', authenticate, blogPostController.editOne);

module.exports = router;
