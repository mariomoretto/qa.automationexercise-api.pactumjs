const { expect } = require('chai');
const { pactum } = require('../../helpers/utils');
const { endpoints } = require('../../config/config');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const { loginSuccessSchema } = require('../../schemas/loginSchema');

describe('Contract - Login', () => {
  let email;
  const password = defaultUser.password;

  before(async () => {
    // Arrange: criar usuário para poder logar
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(novoUsuario)
      .expectStatus(201)
      .toss();
  });

  it('Contrato POST /login - sucesso', async () => {
    // Act
    const res = await pactum
      .spec()
      .post(endpoints.login)
      .withJson({ email, password })
      .expectStatus(200)
      .toss();

    // Assert (Joi)
    const { error } = loginSuccessSchema.validate(res.json, { abortEarly: false });
    expect(error, `Schema inválido: ${error && error.message}`).to.be.undefined;
  });
});
