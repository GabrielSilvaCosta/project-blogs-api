const { User } = require('../models');
const generateToken = require('../utils/jwt');

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getOne = async (options) => {
  const user = await User.findOne(options);
  return user;
};

const saveOne = async (data) => {
  const {
    displayName,
    email,
    password,
    image,
  } = data;

  return User.findOne({ where: { email } })
    .then((userExists) => {
      if (userExists) {
        return { status: 409, message: 'User already registered' };
      }

      return User.create({ displayName, email, password, image })
        .then((newUser) => generateToken({ email: newUser.email })
          .then((token) => ({ status: 201, token }))
          .catch(() => ({ status: 500, message: 'Internal server error' })))
        .catch(() => ({ status: 500, message: 'Internal server error' }));
    })
    .catch(() => ({ status: 500, message: 'Internal server error' }));
};

module.exports = {
  getAll,
  getOne,
  saveOne,
};
