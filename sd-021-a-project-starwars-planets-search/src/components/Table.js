import React, { useContext } from 'react';
import DataContext from '../context/context';
import Filter from './Filter';

function Table() {
  const { data, filterName, array, handleRemove } = useContext(DataContext);

  return (
    data.length && (
      <div className="pai-tabela">
        <Filter />
        <div>
          {array.map((item, index) => (
            <p
              key={ index }
            >
              {`${item.colunas} é ${item.maior} ${item.inNumber}`}
              <button
                type="button"
                className="remove-filter"
                onClick={ handleRemove }
                name={ item.colunas }
              >
                X
              </button>
            </p>
          ))}
        </div>
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((item, index) => (
                <th key={ index }>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) => item.name.toLowerCase().includes(filterName))
              .map((planet, index) => (
                <tr key={ index }>
                  {Object.values(planet).map((item, indice) => (
                    <td key={ indice }>{item}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
}

export default Table;
