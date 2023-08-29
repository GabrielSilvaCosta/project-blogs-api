const { blogPostService } = require('../service');
const { User } = require('../models');

const createPost = async (req, res) => {
  const userId = req.user.id;
  const blogPost = req.body;
  try {
    const data = await blogPostService.createPost({ ...blogPost, userId });

    if (data.error) return res.status(data.status).json({ message: data.error.message });
    return res.status(201).json(data);
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const blogPostList = await blogPostService.getAllPosts({
      include: [
        'categories',
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    return res.status(200).json(blogPostList);
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};

const getOnePost = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const blogPost = await blogPostService.getBlogPostById(id);
    
    if (blogPost.error) {
      return res.status(blogPost.status).json({ message: blogPost.error.message });
    }

    return res.status(200).json(blogPost);
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};

const editOne = async (req, res) => {
  const userId = req.user.id;
  const postId = parseInt(req.params.id, 10);
  const { title, content } = req.body;

  try {
    const data = await blogPostService.editOne({ userId, postId, title, content });

    if (data.error) {
      return res.status(data.status).json({ message: data.error.message });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.code || 500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getOnePost,
  editOne,
};
