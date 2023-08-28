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

const getUser = async (req, res) => {
  const id = parseInt(req.params.id, 10); // Convertendo o ID para número inteiro
  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  const { displayName, email, image } = user;
  return res.status(200).json({ id, displayName, email, image });
};

module.exports = {
  saveUser,
  getAll,
  getUser,
};
