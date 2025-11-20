const { expect } = require('chai');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const { defaultProduct, getRandomProductName } = require('../../data/productData');
const { login } = require('../../clients/loginClient');
const { createUser } = require('../../clients/userClient');
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../../clients/productClient');

describe('e2e - Produtos', () => {
  let adminToken;
  let productId;

  before(async () => {
    // Arrange: criar admin e logar para pegar token
    const email = getRandomEmail();
    const adminUser = { ...defaultUser, email, administrador: 'true' };

    await createUser(adminUser)
      .expectStatus(201)
      .toss();

    const loginResponse = await login(email, adminUser.password)
      .expectStatus(200)
      .toss();

    adminToken = loginResponse.json.authorization;
  });

  it('GET /produtos - deve retornar lista de produtos', async () => {
    // Act
    const response = await getProducts()
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json.quantidade).to.be.a('number');
    expect(response.json.produtos).to.be.an('array');
  });

  it('POST /produtos - deve cadastrar produto com sucesso', async () => {
    // Arrange
    const produto = { ...defaultProduct, nome: getRandomProductName() };

    // Act
    const response = await createProduct(adminToken, produto)
      .expectStatus(201)
      .toss();

    // Assert
    expect(response.json.message).to.equal('Cadastro realizado com sucesso');
    expect(response.json._id).to.be.a('string');
    productId = response.json._id;
  });

  it('GET /produtos/{_id} - deve buscar produto por id', async () => {
    const response = await getProductById(productId)
      .expectStatus(200)
      .toss();

    expect(response.json._id).to.equal(productId);
  });

  it('PUT /produtos/{_id} - deve editar produto por id', async () => {
    // Arrange
    const payload = {
      nome: getRandomProductName(),
      preco: 999,
      descricao: 'Produto editado',
      quantidade: 5
    };

    // Act
    const response = await updateProduct(productId, adminToken, payload)
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json.message).to.be.a('string');
  });

  it('DELETE /produtos/{_id} - deve excluir produto por id', async () => {
    const response = await deleteProduct(productId, adminToken)
      .expectStatus(200)
      .toss();

    expect(response.json.message).to.be.a('string');
  });
});
