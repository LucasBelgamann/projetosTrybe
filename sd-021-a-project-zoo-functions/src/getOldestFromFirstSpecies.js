const data = require('../data/zoo_data');

const { employees } = data;
const { species } = data;

function getOldestFromFirstSpecies(id) {
  const funcionárioId = employees.find((func) => func.id === id); // verifica se o id é igual ao id passado como parâmetro
  const animalId = funcionárioId.responsibleFor[0]; // armazena na const o primeiro animal de responsibleFor.
  const animal = species.find((elemento) => elemento.id === animalId) // faz a verificação do id de species é igual ao do parametro, se for ele traz a idade em ordem descrecente.
    .residents.sort((a, b) => a.age - b.age).reverse();
  return Object.values(animal[0]); // retorna o primeiro animal ou seja o mais velho.
}

console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
module.exports = getOldestFromFirstSpecies;

// 9. Implemente a função getOldestFromFirstSpecies
// A função busca por informações do animal mais velho da primeira espécie gerenciada pela pessoa colaboradora do parâmetro.

// O que será avaliado

// Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário, e retorna um array com nome, sexo e idade do animal mais velho dessa espécie.
