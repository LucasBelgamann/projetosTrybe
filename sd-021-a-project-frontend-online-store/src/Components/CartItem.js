import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddAndRemoveItem from './AddAndRemoveItem';

class CartItem extends Component {
  render() {
    const { cartList, onClickRmv, onClickAdd, arrayOrder } = this.props;
    return (
      <div className="mae-cart-item">
        {cartList.map((item) => (
          <div key={ item.product.id } className="cart-item">
            <img alt={ item.product.title } src={ item.product.thumbnail } />
            <h3 data-testid="shopping-cart-product-name">{ item.product.title }</h3>
            <p>{ `R$ ${item.product.price}` }</p>
            <AddAndRemoveItem
              cartListItem={ item.product || {} }
              cartListQuantity={ item.quantity }
              onClickRmv={ onClickRmv }
              onClickAdd={ onClickAdd }
            />
          </div>
        )).sort((a, b) => arrayOrder.indexOf(a.key) - arrayOrder.indexOf(b.key))}
      </div>
    );
  }
}

CartItem.propTypes = {
  cartList: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickRmv: PropTypes.func.isRequired,
  onClickAdd: PropTypes.func.isRequired,
  arrayOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CartItem;
