const data = require('../data/zoo_data');

// const { species } = data;

function getSpeciesByIds(...ids) {
  return data.species.filter(({ id }) => ids.includes(id)); // faz um filtro em species e traz as species de acordo com o id que foram passados como parametro.
}

module.exports = getSpeciesByIds;
