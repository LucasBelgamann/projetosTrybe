const data = require('../data/zoo_data');

const { employees } = data;

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {}; // se o parametro for igual a undefined ele retorna um objeto vazio.
  }
  return employees.find(
    (elemento) =>
      elemento.firstName === employeeName || elemento.lastName === employeeName, // se o meu elemento for igual ao meu parametro ele retorna o primeiro.
  );
}
console.log(getEmployeeByName());

module.exports = getEmployeeByName;
