const Joi = require("joi");

const skillSchema = Joi.object({
  skillName: Joi.string().min(3).required().messages({
    "string.empty": "Skill name is required.",
    "string.min": "Skill name must be at least 3 characters long.",
    "any.required": "Skill name is required.",
  }),

  level: Joi.number().min(1).max(100).required().messages({
    "number.base": "Skill proficiency must be a number.",
    "number.min": "Skill proficiency minimum is 1.",
    "number.max": "Skill proficiency maximum is 100.",
    "any.required": "Skill proficiency is required.",
  }),
});

module.exports = skillSchema;
