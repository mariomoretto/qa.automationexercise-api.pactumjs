const { expect } = require('chai');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const { login } = require('../../clients/loginClient');
const { createUser } = require('../../clients/userClient');
const { loginSuccessSchema } = require('../../schemas/loginSchema');

describe('Contract - Login', () => {
  let email;
  const password = defaultUser.password;

  before(async () => {
    // Arrange: criar usuário para poder logar
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    await createUser(novoUsuario)
      .expectStatus(201)
      .toss();
  });

  it('Contrato POST /login - sucesso', async () => {
    // Act
    const res = await login(email, password)
      .expectStatus(200)
      .toss();

    // Assert (Joi)
    const { error } = loginSuccessSchema.validate(res.json, { abortEarly: false });
    expect(error, `Schema inválido: ${error && error.message}`).to.be.undefined;
  });
});
