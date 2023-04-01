import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class FilterableProductList extends Component {
  renderProductList(list) {
    const { addToCart } = this.props;

    return list.map((item) => {
      const { id, thumbnail, title, price, shipping } = item;
      return (
        <div data-testid="product" key={ id } className="product">
          <Link
            to={ {
              pathname: `/ProductDetails/${id}`,
              state: { thumbnail, title, price },
            } }
            data-testid="product-detail-link"
          >
            <img src={ thumbnail } alt={ title } />
            <h3 className="title-Product">{title}</h3>
            <p className="title-Product">{`R$ ${price}`}</p>
            {shipping.free_shipping
            && (
              <p data-testid="free-shipping">
                <i className="fa-solid fa-box" />
                {' '}
                Frete Grátis
              </p>
            )}
          </Link>
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ () => addToCart(item) }
          >
            <i className="fa-solid fa-cart-plus" />
            {' '}
            Adicionar ao Carrinho

          </button>
        </div>
      );
    });
  }

  render() {
    const { productList } = this.props;
    return (
      <div className="filtro-produtos">
        {productList.length ? (
          this.renderProductList(productList)
        ) : (
          <h2>Nenhum produto foi encontrado</h2>
        )}
      </div>
    );
  }
}

FilterableProductList.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default FilterableProductList;
