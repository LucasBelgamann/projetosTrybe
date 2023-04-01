/* eslint-disable no-empty */
const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(animal) {
  if (animal === undefined) { // se o meu parametro for igual a undefined ele retorna o nome de todos com a quantidade da specie.
    return species.reduce((acc, todos) => {
      acc[todos.name] = todos.residents.length; // aqui ele esta pegando os nomes e colocando como chave e o tamanho como valor.
      return acc;
    }, {}); // valor inicial do reduce é um objeto vazio.
  }
  if (Object.keys(animal).length === 1) { // se a quantidade das minhas chaves for igual a 1 ele executa a função.
    const result = species.find((elemento) => elemento.name === animal.specie); // o find faz a verificação se meu name é igual ao a specie do meu parametro.
    return result.residents.length; // retorna o tamanho de residentes.
  }
  if (Object.keys(animal).length === 2) { // se a quantidade das minhas chaves for igual a 1 ele executa a função.
    const result2 = species.find((elemento) => elemento.name === animal.specie);
    return result2.residents.filter((elemento3) => elemento3.sex === animal.sex) // verifica o sexo é igual oque foi passado como parametro.
      .length; // retorna o tamanho de residentes de acordo com o sexo.
  }
}
console.log(countAnimals());
// 5. Implemente a função countAnimals
// Esta função é responsável por contabilizar a quantidade de animais de cada espécie.

// Observações técnicas

// Se nenhum argumento for passado, retorna um objeto cujo o nome de cada espécie é uma chave desse objeto, e o total de animais dessa espécie é o seu valor;
// Com o argumento { specie: 'penguins' }, retorna um número, a quantidade de pinguins no zoológico;
// Com o argumento { specie: 'giraffes', sex: 'female' }, retorna um número, a quantidade de girafas do sexo feminino.
// O que será avaliado

// Sem parâmetros, retorna as espécies e sua quantidade;
// Recebendo como parâmetro um objeto com a chave specie, retorna um número, a quantidade de animais daquela espécie;
// Recebendo como parâmetro um objeto com a chave specie e sex, retorna um número, a quantidade de animais daquela espécie, no sexo selecionado.

module.exports = countAnimals;
