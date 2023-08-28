const { Category } = require('../models');

const CREATED_CODE = 201;

const createCategory = async (name) => {
  try {
    const category = await Category.create({ name });
    return { status: CREATED_CODE, category };
  } catch (error) {
    return { status: 500, message: 'Internal server error' };
  }
};

module.exports = {
  createCategory,
};
