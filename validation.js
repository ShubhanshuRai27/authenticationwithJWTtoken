//Validate
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (bodyData) => {
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(bodyData, schema);
};

const loginValidation = (bodyData) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(bodyData, schema);
};

module.exports = {
  registerValidation: registerValidation,
  loginValidation: loginValidation,
};
