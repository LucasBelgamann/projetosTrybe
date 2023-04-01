const data = require('../data/zoo_data');

const { employees } = data;

function isManager(id) {
  return employees.some((elemento) => elemento.managers.includes(id)); // verifica se em managers inclui o id passado como parametro. E retorna true ou false.
}

function getRelatedEmployees(managerId) {
  if (isManager(managerId)) { // recebe a resposta true ou false da função isManager.
    const pessoa = employees.filter((elemento) => elemento.managers.includes(managerId)); // coloca dentro de uma constante as pessoas que tem o id que foi passado como parametro.
    return pessoa.map((elemento2) => `${elemento2.firstName} ${elemento2.lastName}`); // retorna um array com uma concatenação do primeiro nome com o segundo nome das pessoas que estão em pessoa.
  }
  throw new Error('O id inserido não é de uma pessoa colaboradora gerente!'); // se não for id de uma pessoa colocaboradora retorna um erro.
}
console.log(getRelatedEmployees('9e7d4524-363c-416a-8759-8aa7e50c0992'));

module.exports = { isManager, getRelatedEmployees };
