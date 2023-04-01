import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DataContext from './context';

function ProviderData({ children }) {
  const [data, setData] = useState([]);
  const [selectValue, setSelect] = useState({
    colunas: 'population',
    maior: 'maior que',
    inNumber: 0,
  });
  const [colunasName, setColunaFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [array, setArray] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [response2, setResponse] = useState([]);

  const handleFetch = async () => {
    const response = await fetch(
      'https://swapi-trybe.herokuapp.com/api/planets/',
    );
    const dataResp = await response.json();
    const dataFilter = dataResp.results.filter(
      (element) => delete element.residents,
    );
    setData(dataFilter);
    setResponse(dataFilter);
  };

  const filterByNumericValues = () => {
    const { colunas, maior, inNumber } = selectValue;
    setArray((prevState) => ([...prevState, { colunas, maior, inNumber }]));

    const filterByNumeric = data.filter((item) => {
      if (maior === 'maior que') {
        return Number(item[colunas]) > Number(inNumber);
      }
      if (maior === 'menor que') {
        return Number(item[colunas]) < Number(inNumber);
      }
      return Number(item[colunas]) === Number(inNumber);
    });
    setData(filterByNumeric);
    const valor = colunasName.filter((e) => e !== selectValue.colunas);
    setColunaFilter(valor);
    setSelect((prevState) => ({ ...prevState, colunas: valor[0] }));
  };

  const handleRemove = ({ target: { name } }) => {
    setArray(array.filter((item) => item.colunas !== name));
  };

  const handleRemoveAllFilters = () => {
    setArray([]);
    setData(response2);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const contextValue = {
    data,
    filterName,
    setFilterName,
    setSelect,
    filterByNumericValues,
    setColunaFilter,
    colunasName,
    selectValue,
    array,
    handleRemove,
    handleRemoveAllFilters,
  };

  return (
    <DataContext.Provider value={ contextValue }>{children}</DataContext.Provider>
  );
}

ProviderData.propTypes = { children: PropTypes.node.isRequired };

export default ProviderData;
