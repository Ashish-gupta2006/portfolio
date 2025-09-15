const Joi = require("joi");

const projectSchema = Joi.object({
  title: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "any.required": "title is required.",
      "string.empty": "title cannot be empty.",
      "string.pattern.base": "title  must contain only letters",
    }),

  institute: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "any.required": "Institute name is required.",
      "string.empty": "Institute  name cannot be empty.",
      "string.pattern.base": "Institute name  must contain only letters",
    }),

  start: Joi.date().iso().required().messages({
    "any.required": "Starting date is required.",
    "date.base": "Start date must be a valid date.",
  }),

  end: Joi.date().iso().greater(Joi.ref("start")).required().messages({
    "date.greater": "Ending date must be greater than the start date.",
    "any.required": "Ending date is required.",
    "date.base": "End date must be a valid date.",
  }),
});

module.exports = projectSchema;
