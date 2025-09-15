const Joi = require("joi");

const educationSchema = Joi.object({
  degree: Joi.string().required().messages({
    "any.required": "Degree is required.",
    "string.empty": "Degree cannot be empty.",
  }),

  college: Joi.string().required().messages({
    "any.required": "College or Institute is required.",
    "string.empty": "College or Institute cannot be empty.",
  }),

  description: Joi.string().required().messages({
    "any.required": "Description is required.",
    "string.empty": "Description cannot be empty.",
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

module.exports = educationSchema;
