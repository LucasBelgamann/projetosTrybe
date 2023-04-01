require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Teste se fetchProducts é uma função;', () => {
  expect(typeof fetchProducts).toEqual('function');
  });
  it('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalled();
  });
  it('este se, ao chamar a função fetchProducts com o argumento computador, a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
  await fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Teste se o retorno da função fetchProducts com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
  const resultado = await fetchProducts('computador');
  expect(resultado).toEqual( computadorSearch );
  });
  it ('Se a chamada da função fetchProducts() retorna uma mensagem de erro', async () => {
  const result = await fetchProducts();
  expect(result).toEqual(new Error ('You must provide an url'));
    }) 
});
