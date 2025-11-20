const { expect } = require('chai');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const { defaultProduct, getRandomProductName } = require('../../data/productData');
const {
  listaProdutosSchema,
  createProdutoSuccessSchema,
  getProdutoByIdSchema,
  deleteProdutoSchema,
  updateProdutoSchema
} = require('../../schemas/productSchema');
const { login } = require('../../clients/loginClient');
const { createUser } = require('../../clients/userClient');
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../../clients/productClient');

describe('Contract - Produtos', () => {
  let adminToken;
  let productId;

  before(async () => {
    // aqui cria admin + token e um produto base para GET/PUT/DELETE
    const email = getRandomEmail();
    const adminUser = { ...defaultUser, email, administrador: 'true' };

    await createUser(adminUser)
      .expectStatus(201)
      .toss();

    const loginRes = await login(email, adminUser.password)
      .expectStatus(200)
      .toss();

    adminToken = loginRes.json.authorization;

    const initialProduct = { ...defaultProduct, nome: getRandomProductName() };

    const productRes = await createProduct(adminToken, initialProduct)
      .expectStatus(201)
      .toss();

    productId = productRes.json._id;
  });

  it('Contrato GET /produtos', async () => {
    const res = await getProducts()
      .expectStatus(200)
      .toss();

    const { error } = listaProdutosSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato POST /produtos - cadastro com sucesso', async () => {
    const produto = { ...defaultProduct, nome: getRandomProductName() };

    const res = await createProduct(adminToken, produto)
      .expectStatus(201)
      .toss();

    const { error } = createProdutoSuccessSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato GET /produtos/{_id}', async () => {
    const res = await getProductById(productId)
      .expectStatus(200)
      .toss();

    const { error } = getProdutoByIdSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato PUT /produtos/{_id}', async () => {
    const payload = {
      nome: getRandomProductName(),
      preco: 999,
      descricao: 'Produto contrato',
      quantidade: 5
    };

    const res = await updateProduct(productId, adminToken, payload)
      .expectStatus(200)
      .toss();

    const { error } = updateProdutoSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato DELETE /produtos/{_id}', async () => {
    const res = await deleteProduct(productId, adminToken)
      .expectStatus(200)
      .toss();

    const { error } = deleteProdutoSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });
});
