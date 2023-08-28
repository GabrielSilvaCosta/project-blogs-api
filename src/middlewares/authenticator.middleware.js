const jwt = require('jsonwebtoken');
const { userService } = require('../service');

const secret = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = bearerToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userService.getUserById(decoded.data.userId);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authenticate;
