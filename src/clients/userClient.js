const { pactum } = require('../helpers/utils');
const { endpoints } = require('../config/config');

function getUsers() {
  return pactum
    .spec()
    .get(endpoints.usuarios);
}

function createUser(payload) {
  return pactum
    .spec()
    .post(endpoints.usuarios)
    .withJson(payload);
}

function getUserById(id) {
  return pactum
    .spec()
    .get(`${endpoints.usuarios}/${id}`);
}

function updateUser(id, payload) {
  return pactum
    .spec()
    .put(`${endpoints.usuarios}/${id}`)
    .withJson(payload);
}

function deleteUser(id) {
  return pactum
    .spec()
    .delete(`${endpoints.usuarios}/${id}`);
}

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
