const Joi = require("joi");

const messageSchema = Joi.object({
  senderName: Joi.string()
    .required()
    .min(3)
    .max(30)
    .pattern(/^[A-Za-z ]+$/)
    .messages({
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters.",
      "string.max": "Name must be less than 30 characters.",
      "string.pattern.base": "Only alphabets and spaces are allowed.",
    }),

  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }) // disables automatic TLD checking
    .pattern(/^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    .messages({
      "string.empty": "Email is required.",
      "string.email": "Enter a valid email address.",
      "string.pattern.base":
        "Email format is invalid. Avoid double dots or missing domain.",
    }),

  message: Joi.string()
    .required()
    .min(20)
    .pattern(/^[A-Za-z.,?!'"\s-]+$/)
    .messages({
      "string.empty": "Message is required.",
      "string.min": "Message must be at least 20 characters.",
      "string.pattern.base": "Message can only contain alphabets and spaces.",
    }),
});

module.exports = messageSchema;
