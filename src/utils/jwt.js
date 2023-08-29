const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = async (user) => {
  const token = jwt.sign({ data: { userId: user.id } }, JWT_SECRET, JWT_CONFIG);
  return token;
};

module.exports = generateToken;