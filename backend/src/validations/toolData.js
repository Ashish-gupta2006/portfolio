const Joi = require("joi");

const ToolSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.empty": "Title is required.",
      "string.min": "Title must be at least 3 characters.",
      "string.pattern.base": "Title must contain only letters.",
      "any.required": "Title is required.",
    }),
});

module.exports = ToolSchema;
