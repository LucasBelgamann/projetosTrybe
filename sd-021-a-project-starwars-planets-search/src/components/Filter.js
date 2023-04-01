import React, { useContext } from 'react';
import DataContext from '../context/context';

function Filter() {
  const {
    setFilterName,
    setSelect,
    selectValue,
    colunasName,
    handleRemoveAllFilters,
    filterByNumericValues,
  } = useContext(DataContext);

  const handleChange = (name) => {
    setFilterName(name);
  };

  const handleChange2 = ({ target: { name, value } }) => {
    setSelect((oldState) => ({ ...oldState, [name]: value }));
  };

  return (
    <div className="inputs-pai">
      <img
        className="logo"
        src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
        alt="logo-star-wars"
      />
      <div>
        <input
          className="filter-name"
          type="text"
          onChange={ ({ target }) => handleChange(target.value) }
          name="filter-name"
          data-testid="name-filter"
          placeholder="Escreva o nome do planeta"
        />
      </div>
      <select
        data-testid="column-filter"
        value={ selectValue.colunas }
        name="colunas"
        onChange={ handleChange2 }
      >
        {colunasName.map((item, index) => (
          <option key={ index }>{item}</option>
        ))}
      </select>
      <select
        onChange={ handleChange2 }
        name="maior"
        value={ selectValue.maior }
        data-testid="comparison-filter"
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        value={ selectValue.inNumber }
        onChange={ handleChange2 }
        type="number"
        name="inNumber"
        data-testid="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterByNumericValues }
        className="add-filter"
      >
        Adicionar filtro
      </button>
      <button
        type="button"
        className="remove-all"
        onClick={ handleRemoveAllFilters }
      >
        Remove filters
      </button>
    </div>
  );
}

export default Filter;
