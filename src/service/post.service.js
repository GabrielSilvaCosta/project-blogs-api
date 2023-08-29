const { BlogPost, Category, PostCategory, User, sequelize } = require('../models');

const getAllPosts = async (options) => {
  const blogPosts = await BlogPost.findAll(options);
  return blogPosts;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  if (!blogPost) {
    return { error: new Error('Post does not exist'), status: 404 };
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

const editOne = async ({ userId, postId, title, content }) => {
  const blogPost = await BlogPost.findOne({ where: { id: postId, userId } });

  if (!blogPost) {
    return { error: new Error('Unauthorized user'), status: 401 };
  }

  if (!title || !content) {
    return { error: new Error('Some required fields are missing'), status: 400 };
  }

  await blogPost.update({ title, content });

  const updatedBlogPost = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return updatedBlogPost;
};

module.exports = {
  getAllPosts,
  getBlogPostById,
  createPost,
  editOne,
};
