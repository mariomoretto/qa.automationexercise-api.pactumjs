const { pactum } = require('../helpers/utils');
const { endpoints } = require('../config/config');

function getProducts() {
  return pactum
    .spec()
    .get(endpoints.produtos);
}

function createProduct(token, payload) {
  return pactum
    .spec()
    .post(endpoints.produtos)
    .withHeaders('Authorization', token)
    .withJson(payload);
}

function getProductById(id) {
  return pactum
    .spec()
    .get(`${endpoints.produtos}/${id}`);
}

function updateProduct(id, token, payload) {
  return pactum
    .spec()
    .put(`${endpoints.produtos}/${id}`)
    .withHeaders('Authorization', token)
    .withJson(payload);
}

function deleteProduct(id, token) {
  return pactum
    .spec()
    .delete(`${endpoints.produtos}/${id}`)
    .withHeaders('Authorization', token);
}

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
