import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  render() {
    const { onClick, onChange, value } = this.props;
    return (
      <div>
        <div>
          <Link to="/">
            <img
              src="http://4.bp.blogspot.com/-kpXBX8hBvGM/Vms47i2DImI/AAAAAAAATj4/BJixrqsmm0o/s1600/trybe_logo_web_gradient1.png"
              alt="logo"
            />
          </Link>
          <input
            data-testid="query-input"
            type="text"
            name="searchValue"
            value={ value }
            onChange={ onChange }
          />
          <button data-testid="query-button" type="button" onClick={ onClick }>
            <i className="fa-solid fa-magnifying-glass" />
            {' '}
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default SearchBar;
