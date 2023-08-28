const { userService } = require('../service');

const saveUser = async (req, res) => {
  const userData = req.body;
  const response = await userService.saveOne(userData);
  return res.status(response.status).json({ message: response.message, token: response.token });
};

const getAll = async (req, res) => {
  try {
    const userList = await userService.getAll({});
    return res.status(200).json(userList);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  saveUser,
  getAll,
};

module.exports = {
  saveUser,
  getAll,
};
