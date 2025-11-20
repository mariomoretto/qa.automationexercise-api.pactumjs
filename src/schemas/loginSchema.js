const Joi = require('joi');

const loginSuccessSchema = Joi.object({
  message: Joi.string().valid('Login realizado com sucesso').required(),
  authorization: Joi.string().required()
}).unknown(true);

module.exports = {
  loginSuccessSchema
};