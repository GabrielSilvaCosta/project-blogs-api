const { loginService } = require('../service');

const login = async (req, res) => {
  const credentials = req.body;
  const { status, message, token } = await loginService.login(credentials);
  return res.status(status).json({ message, token });
};

module.exports = {
  login,
};