const { expect } = require('chai');
const { pactum } = require('../../helpers/utils');
const { endpoints } = require('../../config/config');
const { defaultUser, getRandomEmail } = require('../../data/userData');
const {
  listaUsuariosSchema,
  createUserSuccessSchema,
  getUsuarioByIdSchema,
  deleteUsuarioSchema,
  updateUsuarioSchema
} = require('../../schemas/userSchema');

describe('Contract - Usuários', () => {
  let userId;
  let email;

  before(async () => {
    // massa para GET/PUT/DELETE por id
    email = getRandomEmail();
    const novoUsuario = { ...defaultUser, email };

    const res = await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(novoUsuario)
      .expectStatus(201)
      .toss();

    userId = res.json._id;
  });

  it('Contrato GET /usuarios', async () => {
    const res = await pactum
      .spec()
      .get(endpoints.usuarios)
      .expectStatus(200)
      .toss();

    const { error } = listaUsuariosSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato POST /usuarios - cadastro com sucesso', async () => {
    const novoEmail = getRandomEmail();
    const novoUsuario = { ...defaultUser, email: novoEmail };

    const res = await pactum
      .spec()
      .post(endpoints.usuarios)
      .withJson(novoUsuario)
      .expectStatus(201)
      .toss();

    const { error } = createUserSuccessSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato GET /usuarios/{_id}', async () => {
    const res = await pactum
      .spec()
      .get(`${endpoints.usuarios}/${userId}`)
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

    const res = await pactum
      .spec()
      .put(`${endpoints.usuarios}/${userId}`)
      .withJson(payload)
      .expectStatus(200)
      .toss();

    const { error } = updateUsuarioSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });

  it('Contrato DELETE /usuarios/{_id}', async () => {
    const res = await pactum
      .spec()
      .delete(`${endpoints.usuarios}/${userId}`)
      .expectStatus(200)
      .toss();

    const { error } = deleteUsuarioSchema.validate(res.json, { abortEarly: false });
    expect(error, error && error.message).to.be.undefined;
  });
});
