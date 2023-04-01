import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';
import FilterableProductList from './FilterableProductList';
import SearchBar from './SearchProduct';
import CartButton from './CartButton';
import Categories from './Categories';
import { addItem, getSavedItens } from '../services/saveProduct';
// requisito 14 iniciado
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFirstLoading: true,
      searchValue: '',
      productList: [],
      radioValue: '',
      qntCartItems: 0,
    };

    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  componentDidMount() {
    this.setState({ qntCartItems: getSavedItens().length });
  }

  async handleSearchButton(searchValue, radio = undefined) {
    const { radioValue } = this.state;
    const setRadio = radio || radioValue;
    const setProducts = await getProductsFromCategoryAndQuery(
      setRadio,
      searchValue,
    );
    if (setProducts) {
      this.setState({ productList: setProducts.results, isFirstLoading: false });
    }
  }

  handleOnInputChange({ target: { name, type, checked, value } }) {
    const checkedValue = type === 'checkbox' ? checked : value;
    this.setState({ [name]: checkedValue });
  }

  async handleRadioInput({ target: { value } }, searchValue) {
    const setProducts = await getProductsFromCategoryAndQuery(
      value,
      searchValue,
    );
    if (!searchValue) {
      this.setState({ productList: setProducts.results, isFirstLoading: false });
    } else {
      this.setState(
        { radioValue: value }, await this.handleSearchButton(searchValue, value),
      );
    }
  }

  handleCartClick(cartItem) {
    addItem(cartItem);
    this.setState({ qntCartItems: getSavedItens().length });
  }

  render() {
    const {
      searchValue,
      productList,
      isFirstLoading,
      radioValue,
      qntCartItems,
    } = this.state;
    return (
      <div className="principal">
        <header className="search-input">
          <SearchBar
            onClick={ () => this.handleSearchButton(searchValue) }
            onChange={ this.handleOnInputChange }
            value={ searchValue }
          />
          <CartButton qnt={ qntCartItems } />
        </header>
        <main className="main-home">
          <nav className="nav">
            <Categories
              onClick={
                (e) => this.handleRadioInput(e, searchValue)
              }
              value={ radioValue }
            />
          </nav>
          <div className="button-and-message">
            {isFirstLoading ? (
              <div className="menssage">
                <h1 data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </h1>
              </div>
            ) : (
              <FilterableProductList
                productList={ productList }
                addToCart={ this.handleCartClick }
              />
            )}
          </div>     
        </main>
      </div>
    );
  }
}

export default Home;
