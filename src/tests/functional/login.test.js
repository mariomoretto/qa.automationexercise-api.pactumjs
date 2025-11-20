const { expect } = require('chai');
const { pactum } = require('../../helpers/utils');
const { endpoints } = require('../../config/config');
const { defaultUser, getRandomEmail } = require('../../data/userData');

describe('Functional - Login', () => {
  let email;
  let password = defaultUser.password;

  before(async () => {
    // Arrange (setup inicial): criar usuário admin para usar no login
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(novoUsuario)
      .expectStatus(201)
      .toss();
  });

  it('POST /login - deve logar com sucesso', async () => {
    // Arrange
    const payload = { email, password };

    // Act
    const response = await pactum
      .spec()
      .post(endpoints.login)
      .withJson(payload)
      .expectStatus(200)
      .toss();

    // Assert
    expect(response.json.message).to.equal('Login realizado com sucesso');
    expect(response.json.authorization).to.be.a('string');
  });
});
