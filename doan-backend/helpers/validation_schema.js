const Joi = require("@hapi/joi");
const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  role: Joi.string().required(),
  fullName: Joi.string().required(),
});

const LoginValidate = Joi.object({
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
});

module.exports = {
  authSchema: authSchema,
  loginValidate: LoginValidate,
};
