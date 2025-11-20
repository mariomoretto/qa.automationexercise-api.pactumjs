const { expect } = require('chai');
const { pactum } = require('../../helpers/utils');
const { endpoints } = require('../../config/config');
const { defaultUser, getRandomEmail } = require('../../data/userData');

describe('Functional - Usuários', () => {
  let userId;
  let email;

  it('GET /usuarios - deve retornar lista de usuários', async () => {
    // Act
    const response = await pactum
      .spec()
      .get(endpoints.usuarios)
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json.quantidade).to.be.a('number');
    expect(response.json.usuarios).to.be.an('array');
  });

  it('POST /usuarios - deve criar usuário com sucesso', async () => {
    // Arrange
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    // Act
    const response = await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(novoUsuario)
      .expectStatus(201)
      .toss();

    // Assert
    expect(response.json.message).to.equal('Cadastro realizado com sucesso');
    expect(response.json._id).to.be.a('string');
    userId = response.json._id;
  });

  it('GET /usuarios/{_id} - deve buscar usuário por id', async () => {
    // pré-condição: userId criado no teste anterior

    // Act
    const response = await pactum
      .spec()
      .get(`${endpoints.usuarios}/${userId}`)
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json._id).to.equal(userId);
    expect(response.json.email).to.equal(email);
  });

  it('PUT /usuarios/{_id} - deve alterar usuário por id', async () => {
    // Arrange
    const payload = {
      nome: 'Usuario Atualizado',
      email,
      password: defaultUser.password,
      administrador: defaultUser.administrador
    };

    // Act
    const response = await pactum
      .spec()
      .put(`${endpoints.usuarios}/${userId}`)
      .withJson(payload)
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json.message).to.equal('Registro alterado com sucesso');
  });

  it('DELETE /usuarios/{_id} - deve excluir usuário por id', async () => {
    // Act
    const response = await pactum
      .spec()
      .delete(`${endpoints.usuarios}/${userId}`)
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json.message).to.be.a('string');
  });
});
