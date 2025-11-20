const Joi = require('joi');

const produtoSchema = Joi.object({
  nome: Joi.string().required(),
  preco: Joi.number().required(),
  descricao: Joi.string().required(),
  quantidade: Joi.number().required(),
  _id: Joi.string().required()
}).unknown(true);

// GET /produtos
const listaProdutosSchema = Joi.object({
  quantidade: Joi.number().required(),
  produtos: Joi.array().items(produtoSchema).required()
}).unknown(true);

// POST /produtos
const createProdutoSuccessSchema = Joi.object({
  message: Joi.string().valid('Cadastro realizado com sucesso').required(),
  _id: Joi.string().required()
}).unknown(true);

// GET /produtos/{_id}
const getProdutoByIdSchema = produtoSchema;

// DELETE /produtos/{_id}
const deleteProdutoSchema = Joi.object({
  message: Joi.string().required()
}).unknown(true);

// PUT /produtos/{_id}
const updateProdutoSchema = Joi.object({
  message: Joi.string().required()
}).unknown(true);

module.exports = {
  listaProdutosSchema,
  createProdutoSuccessSchema,
  getProdutoByIdSchema,
  deleteProdutoSchema,
  updateProdutoSchema
};
