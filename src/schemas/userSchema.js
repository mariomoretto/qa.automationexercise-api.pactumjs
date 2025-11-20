const Joi = require('joi');

const usuarioSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  administrador: Joi.string().required(),
  _id: Joi.string().required()
}).unknown(true);

// GET /usuarios
const listaUsuariosSchema = Joi.object({
  quantidade: Joi.number().required(),
  usuarios: Joi.array().items(usuarioSchema).required()
}).unknown(true);

// POST /usuarios (cadastro com sucesso)
const createUserSuccessSchema = Joi.object({
  message: Joi.string().valid('Cadastro realizado com sucesso').required(),
  _id: Joi.string().required()
}).unknown(true);

// GET /usuarios/{_id}
const getUsuarioByIdSchema = usuarioSchema;

// DELETE /usuarios/{_id}
const deleteUsuarioSchema = Joi.object({
  message: Joi.string().required()
}).unknown(true);

// PUT /usuarios/{_id}
const updateUsuarioSchema = Joi.object({
  message: Joi.string().valid('Registro alterado com sucesso').required()
}).unknown(true);

module.exports = {
  listaUsuariosSchema,
  createUserSuccessSchema,
  getUsuarioByIdSchema,
  deleteUsuarioSchema,
  updateUsuarioSchema
};
