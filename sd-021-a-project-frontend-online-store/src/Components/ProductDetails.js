import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addItem, getSavedItens } from '../services/saveProduct';
import CartButton from './CartButton';
import EvaluationProduct from './EvaluationProduct';
import { addEval, getSavedEval } from '../services/saveEvaluation';

class ProductDetails extends React.Component {
  state = {
    product: {},
    productEvaluationList: [],
    email: '',
    desc: '',
    rating: '',
  }
  // const { addToCart } = this.props;

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const setEvalList = getSavedEval();
    this.setState({
      productEvaluationList: setEvalList,
      qntCartItems: getSavedItens().length,
    });
    const url = `https://api.mercadolibre.com/items/${id}`;
    const getFetch = await fetch(url);
    const dataJson = await getFetch.json();
    this.setState({ product: dataJson });
  }

  handleCartClick(cartItem) {
    addItem(cartItem);
    this.setState({ qntCartItems: getSavedItens().length });
  }

  handleEvaluation = () => {
    const { rating, email, desc } = this.state;
    addEval(
      {
        rating,
        email,
        desc,
      },
    );
    const setEvalList = getSavedEval();
    this.setState({
      productEvaluationList: setEvalList,
      rating: '',
      email: '',
      desc: '',
    });
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  render() {
    const {
      product,
      productEvaluationList,
      email,
      desc,
      rating,
      qntCartItems,
    } = this.state;
    const { thumbnail: image, title: name, price } = product;
    console.log(product);
    return (
      <div className="products-details">
        <div className="detalhes">

          <Link to="/">
            <button type="button" className="circle-left">
              <i className="fa-solid fa-circle-left" />
              Voltar
            </button>
          </Link>
          <h1 data-testid="product-detail-name">{`${name} - R$ ${price}`}</h1>
          <img src={ image } alt="foto do produto" />
          <p>{name}</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            className="add-cart-details"
            onClick={ () => this.handleCartClick(product) }
          >
            <i className="fa-solid fa-cart-plus" />
            Adicionar ao Carrinho
          </button>
          <CartButton qnt={ qntCartItems } />
        </div>
        <div className="avaliacao">
          <EvaluationProduct
            onClick={ this.handleEvaluation }
            onChange={ this.handleInput }
            email={ email }
            desc={ desc }
            rating={ rating }
          />
          {
            productEvaluationList.length > 0
          && (
            productEvaluationList.map((elem, index) => (
              <div key={ index + 2 }>
                <span>{elem.email}</span>
                <span>{elem.rating}</span>
                <p>{elem.desc}</p>
              </div>
            ))
          )
          }
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default ProductDetails;
