const { expect } = require('chai');
const { pactum } = require('../../helpers/utils');
const { endpoints } = require('../../config/config');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const { defaultProduct, getRandomProductName } = require('../../data/productData');
const {
  listaProdutosSchema,
  createProdutoSuccessSchema,
  getProdutoByIdSchema,
  deleteProdutoSchema,
  updateProdutoSchema
} = require('../../schemas/productSchema');

describe('Contract - Produtos', () => {
  let adminToken;
  let productId;

  before(async () => {
    // cria admin + token e um produto base para GET/PUT/DELETE
    const email = getRandomEmail();
    const adminUser = { ...defaultUser, email, administrador: 'true' };

    await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(adminUser)
      .expectStatus(201)
      .toss();

    const loginRes = await pactum
      .spec()
      .post(endpoints.login)
      .withJson({ email, password: adminUser.password })
      .expectStatus(200)
      .toss();

    adminToken = loginRes.json.authorization;

    const initialProduct = { ...defaultProduct, nome: getRandomProductName() };

    const productRes = await pactum
      .spec()
      .post(endpoints.produtos)
      .withHeaders('Authorization', adminToken)
      .withJson(initialProduct)
      .expectStatus(201)
      .toss();

    productId = productRes.json._id;
  });

  it('Contrato GET /produtos', async () => {
    const res = await pactum
      .spec()
      .get(endpoints.produtos)
      .expectStatus(200)
      .toss();

    const { error } = listaProdutosSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato POST /produtos - cadastro com sucesso', async () => {
    const produto = { ...defaultProduct, nome: getRandomProductName() };

    const res = await pactum
      .spec()
      .post(endpoints.produtos)
      .withHeaders('Authorization', adminToken)
      .withJson(produto)
      .expectStatus(201)
      .toss();

    const { error } = createProdutoSuccessSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato GET /produtos/{_id}', async () => {
    const res = await pactum
      .spec()
      .get(`${endpoints.produtos}/${productId}`)
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

    const res = await pactum
      .spec()
      .put(`${endpoints.produtos}/${productId}`)
      .withHeaders('Authorization', adminToken)
      .withJson(payload)
      .expectStatus(200)
      .toss();

    const { error } = updateProdutoSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato DELETE /produtos/{_id}', async () => {
    const res = await pactum
      .spec()
      .delete(`${endpoints.produtos}/${productId}`)
      .withHeaders('Authorization', adminToken)
      .expectStatus(200)
      .toss();

    const { error } = deleteProdutoSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });
});
