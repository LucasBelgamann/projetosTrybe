import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { addItem, getSavedItens, removeItem } from '../services/saveProduct';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartListRepeated: [],
      arrayOrder: [],
    };

    this.handleCartList = this.handleCartList.bind(this);
    this.onClickRmv = this.onClickRmv.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.getArrayOrder = this.getArrayOrder.bind(this);
  }

  componentDidMount() {
    const setCartList = getSavedItens();
    const setList = this.handleCartList(setCartList);
    const setArrayOrder = this.getArrayOrder(setList);
    this.setState({
      cartListRepeated: setList,
      arrayOrder: setArrayOrder,
    });
  }

  handleCartList(cartList) {
    const objList = cartList.reduce((acc, elem) => {
      if (!acc[0].product) {
        const prodObj = { product: elem, quantity: 1 };
        acc.splice(0, 1, prodObj);
      } else {
        const itemList = acc.find((p) => p.product.id === elem.id);
        const index = acc.indexOf(itemList);
        if (itemList) {
          const prodObj = {
            product: elem,
            quantity: parseInt(itemList.quantity, 10) + 1,
          };
          acc.splice(index, 1, prodObj);
        } else {
          const prodObj = { product: elem, quantity: 1 };
          acc.push(prodObj);
        }
      }
      return acc;
    }, [{ product: '', quantity: 0 }]);
    return objList;
  }

  onClickRmv(item) {
    removeItem(item);
    const setCartList = getSavedItens();
    const setList = this.handleCartList(setCartList);
    this.setState({ cartListRepeated: setList });
  }

  onClickAdd(item) {
    addItem(item);
    const setCartList = getSavedItens();
    const setList = this.handleCartList(setCartList);
    this.setState({ cartListRepeated: setList });
  }

  getArrayOrder(array) {
    const order = array.map((item) => item.product.id);
    return order;
  }

  render() {
    const { cartListRepeated, arrayOrder } = this.state;
    return (
      <div className="cart">
        <h1>Carrinho de compras</h1>
        {getSavedItens().length ? (
          <CartItem
            arrayOrder={ arrayOrder }
            cartList={ cartListRepeated }
            onClickRmv={ this.onClickRmv }
            onClickAdd={ this.onClickAdd }
          />
        ) : (
          <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
        )}
        <Link to="/Checkout">
          <button type="button" data-testid="checkout-products" className="button-final">
            <i className="fa-solid fa-cart-plus" />
            {' '}
            Finalizar a compra
          </button>
        </Link>
      </div>
    );
  }
}

// Cart.propTypes = {
//   cartListRepeated: PropTypes.shape({
//     product: PropTypes.arrayOf,
//     quantity: PropTypes.number,
//   }).isRequired,
// };

export default Cart;
