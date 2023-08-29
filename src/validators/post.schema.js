const Joi = require('joi');

const blogPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().integer().positive()).required(),
});

module.exports = blogPostSchema;
