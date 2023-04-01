const data = require('../data/zoo_data');

const { prices } = data;

function countEntrants(entrants) { // Objeto entrants passado como parâmetro.
  const resultado = entrants.reduce((acc, value) => { // iniciando o meu reduce para a contrução do objeto.
    if (value.age < 18) { // se a idade for menor que 18 ele acrecenta mais um na chave child.
      return { child: acc.child + 1, adult: acc.adult, senior: acc.senior };
    }
    if (value.age >= 18 && value.age < 50) { // se a idade for maior um igual a 18 e menor que 50 ele acrecenta mais um na chave adult
      return { child: acc.child, adult: acc.adult + 1, senior: acc.senior };
    }
    if (value.age >= 50) { // se idade for maior ou igual a 50 ele acrecenta mais um na chave senior.
      return { child: acc.child, adult: acc.adult, senior: acc.senior + 1 };
    }
    return acc;
  }, { child: 0, adult: 0, senior: 0 }); // valor inicial do reduce.
  return resultado; // retornando o meu objeto.
}

function calculateEntry(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) { // se parametro ou tamanho do meu paramentro for igual a 0 ele retorna 0.
    return 0;
  }
  const myFunction = countEntrants(entrants); // colocando minha callBack dentro de uma constante.

  const entradaChild = myFunction.child * prices.child; // aqui eu estou pegando a quantidade de crianças da minha função e multiplicando pelo preço de child.
  const entradaAdult = myFunction.adult * prices.adult; // aqui eu estou pegando a quantidade de adultos da minha função e multiplicando pelo preço de adult.
  const entradaSenior = myFunction.senior * prices.senior; // aqui eu estou pegando a quantidade de seniors da minha função e multiplicando pelo preço de senior.
  const valorFinal = entradaChild + entradaAdult + entradaSenior; // aqui estou somando todos os valores da minhas variaveis que estão armazenadas minhas entradas.
  return valorFinal; // Retorno do soma.
}

module.exports = { calculateEntry, countEntrants };
