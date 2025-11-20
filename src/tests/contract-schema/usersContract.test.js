const { expect } = require('chai');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const {
  listaUsuariosSchema,
  createUserSuccessSchema,
  getUsuarioByIdSchema,
  deleteUsuarioSchema,
  updateUsuarioSchema
} = require('../../schemas/userSchema');
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../../clients/userClient');

describe('Contract - Usuários', () => {
  let userId;
  let email;

  before(async () => {
    // massa para GET/PUT/DELETE por id
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    const res = await createUser(novoUsuario)
      .expectStatus(201)
      .toss();

    userId = res.json._id;
  });

  it('Contrato GET /usuarios', async () => {
    const res = await getUsers()
      .expectStatus(200)
      .toss();

    const { error } = listaUsuariosSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato POST /usuarios - cadastro com sucesso', async () => {
    const novoEmail = getRandomEmail();
    const novoUsuario = { ...defaultUser, email: novoEmail };

    const res = await createUser(novoUsuario)
      .expectStatus(201)
      .toss();

    const { error } = createUserSuccessSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato GET /usuarios/{_id}', async () => {
    const res = await getUserById(userId)
      .expectStatus(200)
      .toss();

    const { error } = getUsuarioByIdSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato PUT /usuarios/{_id}', async () => {
    const payload = {
      nome: 'Usuario Contrato',
      email,
      password: defaultUser.password,
      administrador: defaultUser.administrador
    };

    const res = await updateUser(userId, payload)
      .expectStatus(200)
      .toss();

    const { error } = updateUsuarioSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato DELETE /usuarios/{_id}', async () => {
    const res = await deleteUser(userId)
      .expectStatus(200)
      .toss();

    const { error } = deleteUsuarioSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });
});
