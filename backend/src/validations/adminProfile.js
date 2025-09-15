const Joi = require("joi");

const adminProfileSchema = Joi.object({
  adminName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
    "any.required": "Name is required",
  }),

  about: Joi.string().min(1000).required().messages({
    "string.empty": "About is required",
    "string.min": " About must be at least 1000 characters",
    "any.required": "About is required",
  }),

  profession: Joi.string().min(100).required().messages({
    "string.empty": "Profession is required",
    'string.min':'profession must be at least 100 character.',
    "any.required": "Profession is required",
  }),


});

module.exports = adminProfileSchema;
