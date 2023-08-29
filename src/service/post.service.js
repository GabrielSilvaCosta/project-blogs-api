const { BlogPost, Category, PostCategory, sequelize } = require('../models');

const getAllPosts = async (options) => {
  const blogPosts = await BlogPost.findAll(options);
  return blogPosts;
};

const getPostById = async (id) => {
  const blogPost = await BlogPost.findOne({ where: { id } });
  if (!blogPost) {
    return { error: new Error('BlogPost does not exist'), status: 404 };
  }
  return blogPost;
};

const createPost = async ({ userId, title, content, categoryIds }) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categoryIds.length !== categories.length) {
    const error = new Error('one or more "categoryIds" not found');
    error.code = 400;
    throw error;
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const blogPost = await BlogPost.create({ userId, title, content }, { transaction: t });

      const postCategories = categoryIds.map((id) => ({ postId: blogPost.id, categoryId: id }));
      await PostCategory.bulkCreate(postCategories, { transaction: t });

      return blogPost;
    });

    return result;
  } catch (error) {
    throw new Error('An error occurred while saving the post');
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
};
