const { expect } = require('chai');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../../clients/userClient');

describe('e2e - Usuários', () => {
  let userId;
  let email;

  it('GET /usuarios - deve retornar lista de usuários', async () => {
    // Act
    const res = await getUsers()
      .expectStatus(200)
      .toss();

    // Assert
    expect(res.json.quantidade).to.be.a('number');
    expect(res.json.usuarios).to.be.an('array');
  });

  it('POST /usuarios - deve criar usuário com sucesso', async () => {
    // Arrange
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    // Act
    const res = await createUser(novoUsuario)
      .expectStatus(201)
      .toss();

    // Assert
    expect(res.json.message).to.equal('Cadastro realizado com sucesso');
    expect(res.json._id).to.be.a('string');
    userId = res.json._id;
  });

  it('GET /usuarios/{_id} - deve buscar usuário por id', async () => {
    const res = await getUserById(userId)
      .expectStatus(200)
      .toss();

    expect(res.json._id).to.equal(userId);
    expect(res.json.email).to.equal(email);
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
    const res = await updateUser(userId, payload)
      .expectStatus(200)
      .toss();

    // Assert
    expect(res.json.message).to.equal('Registro alterado com sucesso');
  });

  it('DELETE /usuarios/{_id} - deve excluir usuário por id', async () => {
    const res = await deleteUser(userId)
      .expectStatus(200)
      .toss();

    expect(res.json.message).to.be.a('string');
  });
});
