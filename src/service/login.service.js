const userService = require('./user.service');
const getToken = require('../utils/jwt');

const login = async ({ email, password }) => {
  const user = await userService.getOne({ 
    where: {
      email,
      password,
    }, 
  });
  if (!user) {
    return { status: 400, message: 'Invalid fields' };
  }

  const token = await getToken(user);

  return { status: 200, token };
};

module.exports = {
  login,
};