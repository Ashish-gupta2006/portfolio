const Joi = require("joi");

const projectSchema = Joi.object({
  projectName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(5)
    .required()
    .messages({
      "string.pattern.base": "project name must contain only latter.",
      "string.min": "project name must be at least 5 characters.",
      "any.required": "project name is required.",
    }),
  description: Joi.string()
    .min(10)
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "description must contain only letters. ",
      "string.min": "description be at least 100 characters. ",
      "string.empty": "description is required. ",
    }),
});

module.exports = projectSchema;
