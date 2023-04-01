import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddAndRemoveItem extends Component {
  disabledButtonRmv = (qnt) => {
    if (qnt === 1) {
      return true;
    }
    return false;
  }

  disabledButtonAdd = (qnt) => {
    const { cartListItem } = this.props;
    if (qnt === cartListItem.available_quantity) {
      return true;
    }
    return false;
  }

  render() {
    const {
      cartListItem,
      cartListQuantity,
      onClickRmv,
      onClickAdd,
    } = this.props;

    return (
      <div>
        <button
          type="button"
          onClick={ () => onClickRmv(cartListItem) }
          data-testid="product-decrease-quantity"
          disabled={ this.disabledButtonRmv(cartListQuantity) }
        >
          -
        </button>
        <span
          data-testid="shopping-cart-product-quantity"
        >
          {' '}
          { cartListQuantity }
          {' '}
        </span>
        <button
          type="button"
          onClick={ () => onClickAdd(cartListItem) }
          data-testid="product-increase-quantity"
          disabled={ this.disabledButtonAdd(cartListQuantity) }
        >
          +
        </button>
      </div>
    );
  }
}

AddAndRemoveItem.propTypes = {
  cartListItem: PropTypes.shape(undefined).isRequired,
  onClickRmv: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  cartListQuantity: PropTypes.number.isRequired,
};

export default AddAndRemoveItem;
