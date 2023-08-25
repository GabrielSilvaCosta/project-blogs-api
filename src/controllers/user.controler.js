const { userService } = require('../service');

const saveUser = async (req, res) => {
  const userData = req.body;
  const response = await userService.saveOne(userData);
  return res.status(response.status).json({ message: response.message, token: response.token });
};

module.exports = {
  saveUser,
};
