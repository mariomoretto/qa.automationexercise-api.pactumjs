const getRandomEmail = () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}@qa.com`;

const defaultUser = {
  nome: 'Mario QA',
  password: 'teste',
  administrador: 'true'
};

module.exports = {
  defaultUser,
  getRandomEmail
};