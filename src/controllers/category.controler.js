const { categoryService } = require('../service');

const getCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const response = await categoryService.createCategory(name);
  return res.status(response.status).json(response.category);
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAll();
  return res.status(200).json(categories);
};

module.exports = {
   getCategory,
   getAllCategories,
};
