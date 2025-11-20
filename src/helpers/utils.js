const pactum = require('pactum');
const config = require('../config/config');

pactum.request.setBaseUrl(config.baseUrl);


module.exports = { pactum };
