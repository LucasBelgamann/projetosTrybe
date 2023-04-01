import React, { Component } from 'react';
import PropTypes from 'prop-types';

const valuesList = [1, 1, 1, 1, 1];

class EvaluationProduct extends Component {
  render() {
    const {
      onClick,
      onChange,
      email,
      rating,
      desc,
    } = this.props;
    return (
      <div className="evaluation">
        <div className="filha-evaluation">
          <h4>Avaliação</h4>
          <form>
            <label htmlFor="input-email">
              Email:
              <input
                type="email"
                data-testid="product-detail-email"
                value={ email }
                name="email"
                id="input-email"
                className="input-email"
                onChange={ onChange }
              />
            </label>
            {
              valuesList.map((elem, index) => (
                <label htmlFor="input-radio" key={ index } className="radio">
                  { elem + index }
                  <input
                    type="radio"
                    id="input-radio"
                    value={ elem + index }
                    name="rating"
                    checked={ parseInt(rating, 10) === elem + index }
                    data-testid={ `${index + 1}-rating` }
                    onChange={ onChange }
                  />
                </label>
              ))
            }
            <label htmlFor="text-area">
              <textarea
                data-testid="product-detail-evaluation"
                value={ desc }
                name="desc"
                id="text-area"
                className="text-area"
                onChange={ onChange }
              />
              Comentario:
            </label>
            <div className="submit-review-btn">
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ onClick }
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

EvaluationProduct.propTypes = {
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
};

export default EvaluationProduct;
