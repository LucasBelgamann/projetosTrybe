const { species, employees } = require('../data/zoo_data');
const data = require('../data/zoo_data');

const getSpecies = employees.map((colaborador) => {
  const objeto = {
    id: colaborador.id, // nessa primeira linha eu estou pegando o id atraves do value do map.
    fullName: `${colaborador.firstName} ${colaborador.lastName}`, // Nessa segunda linha eu estou fazendo a concatenação dos nomes atraves do templete literals.
    species: colaborador.responsibleFor.map((specieId) => // verifica se o id do animal de responsibleFor é igual o id de species e traz o nome do animal.
      species.find((specie) => specie.id === specieId).name),
    locations: colaborador.responsibleFor.map((locais) =>
      species.find((specie2) => specie2.id === locais).location),
  };
  return objeto;
});

console.log(getSpecies);

function getEmployeesCoverage(objeto = getSpecies) { // como parâmetro eu estou utilizando o Default parameter
  if (objeto.name || objeto.id) { // nessa condição eu estou vendo se o nome ou o id são igual a true.
    const verifica = getSpecies.find((specie3) => // se um dos dois for igual a true sera executada essa função.
      specie3.fullName.includes(objeto.name) || specie3.id === objeto.id); // nesse find estou verificando se o fullName contem o name, e se meu id é igual ao que foi passado como parâmetro.
    if (!verifica) throw new Error('Informações inválidas'); // se a condição for falsa ele passa para o error.
    return verifica; // retornando minha constante.
  }
  return objeto; // retornando meu objeto.
}

module.exports = getEmployeesCoverage;
