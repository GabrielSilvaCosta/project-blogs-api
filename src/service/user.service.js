const { User } = require('../models');
const generateToken = require('../utils/jwt');

const getAll = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

const getOne = async (options) => {
  const user = await User.findOne(options);
  return user;
};

const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return user;
};

const saveOne = async (data) => {
  const {
    displayName,
    email,
    password,
    image,
  } = data;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return { status: 409, message: 'User already registered' };
    }

    const newUser = await User.create({ displayName, email, password, image });
    const token = await generateToken({ email: newUser.email });

    return { status: 201, token };
  } catch (error) {
    return { status: 500, message: 'Internal server error' };
  }
};

module.exports = {
  getAll,
  getOne,
  saveOne,
  getUserById,
};

module.exports = {
  getAll,
  getOne,
  saveOne,
  getUserById,
};
