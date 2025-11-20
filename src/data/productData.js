const getRandomProductName = () => `Produto QA ${Date.now()}`;

const defaultProduct = {
  nome: getRandomProductName(),
  preco: 470,
  descricao: 'Mouse QA',
  quantidade: 10
};

module.exports = {
  defaultProduct,
  getRandomProductName
};