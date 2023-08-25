const MISSING_FIELD_MESSAGE = 'Some required fields are missing';

const validateFields = (req, res, next) => {
  const credentials = req.body;
  const { email, password } = credentials;

  if (!email || !password) {
    return res.status(400).json({
      message: MISSING_FIELD_MESSAGE,
    });
  }

  next();
};

module.exports = {
  validateFields,
};