const { expect } = require('chai');
const { pactum } = require('../../helpers/utils');
const { endpoints } = require('../../config/config');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const { defaultProduct, getRandomProductName } = require('../../data/productData');

describe('Functional - Produtos', () => {
  let adminToken;
  let productId;

  before(async () => {
    // Arrange: criar admin e logar para pegar token
    const email = getRandomEmail();
    const adminUser = { ...defaultUser, email, administrador: 'true' };

    await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(adminUser)
      .expectStatus(201)
      .toss();

    const loginResponse = await pactum
      .spec()
      .post(endpoints.login)
      .withJson({ email, password: adminUser.password })
      .expectStatus(200)
      .toss();

    adminToken = loginResponse.json.authorization;
  });

  it('GET /produtos - deve retornar lista de produtos', async () => {
    const response = await pactum
      .spec()
      .get(endpoints.produtos)
      .expectStatus(200)
      .toss();

    expect(response.json.quantidade).to.be.a('number');
    expect(response.json.produtos).to.be.an('array');
  });

  it('POST /produtos - deve cadastrar produto com sucesso', async () => {
    // Arrange
    const produto = { ...defaultProduct, nome: getRandomProductName() };

    const response = await pactum
      .spec()
      .post(endpoints.produtos)
      .withHeaders('Authorization', adminToken)
      .withJson(produto)
      .expectStatus(201)
      .toss();

    expect(response.json.message).to.equal('Cadastro realizado com sucesso');
    expect(response.json._id).to.be.a('string');
    productId = response.json._id;
  });

  it('GET /produtos/{_id} - deve buscar produto por id', async () => {
    const response = await pactum
      .spec()
      .get(`${endpoints.produtos}/${productId}`)
      .expectStatus(200)
      .toss();

    expect(response.json._id).to.equal(productId);
  });

  it('PUT /produtos/{_id} - deve editar produto por id', async () => {
    const payload = {
      nome: getRandomProductName(),
      preco: 999,
      descricao: 'Produto editado',
      quantidade: 5
    };

    const response = await pactum
      .spec()
      .put(`${endpoints.produtos}/${productId}`)
      .withHeaders('Authorization', adminToken)
      .withJson(payload)
      .expectStatus(200)
      .toss();

    expect(response.json.message).to.be.a('string');
  });

  it('DELETE /produtos/{_id} - deve excluir produto por id', async () => {
    const response = await pactum
      .spec()
      .delete(`${endpoints.produtos}/${productId}`)
      .withHeaders('Authorization', adminToken)
      .expectStatus(200)
      .toss();

    expect(response.json.message).to.be.a('string');
  });
});
