const data = require('../data/zoo_data');

const { species } = data;

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const animais = species.find((nomeAnimal) => nomeAnimal.name === animal).residents; // compara o nome do animal se é igual ao do parametro, e retorna o primeiro.

  return animais.every((idade) => idade.age > age); // retorna os animais se todos atenderem a condição.
}

module.exports = getAnimalsOlderThan;
