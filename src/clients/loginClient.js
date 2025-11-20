const { pactum } = require('../helpers/utils');
const { endpoints } = require('../config/config');

function login(email, password) {
  return pactum
    .spec()
    .post(endpoints.login)
    .withJson({ email, password });
}

module.exports = {
  login
};
