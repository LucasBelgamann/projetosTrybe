import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestAPI,
  requestApiTwo,
  removeDespesa,
  editAction,
  editUpdate,
} from '../actions';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { fetchReq } = this.props;
    fetchReq();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { fetchTwo, editor, editUp } = this.props;
    if (editor) {
      const { id, exchangeRates } = this.props;
      const obj = { ...this.state, id, exchangeRates };
      console.log(obj);
      editUp({ ...this.state, id, exchangeRates });
    } else {
      fetchTwo(this.state);
      this.setState(({ id }) => ({ ...INITIAL_STATE, id: id + 1 }));
    }
  };

  render() {
    const { email, currencies, expenses, remove, editor, edit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <div>
            <ul>
              <li data-testid="email-field">{email}</li>
              <li data-testid="total-field">
                {!expenses
                  ? 0
                  : expenses
                    .reduce((acc, curr) => {
                      acc
                          += curr.exchangeRates[curr.currency].ask * curr.value;
                      return acc;
                    }, 0)
                    .toFixed([2])}
              </li>
              <li data-testid="header-currency-field">BRL</li>
            </ul>
          </div>
        </header>
        <form>
          <label htmlFor="value">
            value
            <input
              id="value"
              name="value"
              type="number"
              value={ value }
              data-testid="value-input"
              placeholder="value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição
            <input
              data-testid="description-input"
              id="description-input"
              name="description"
              value={ description }
              placeholder="Descrição"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select
              id="moeda"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((item, index) => (
                <option key={ index }>{item}</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Despesa
            <select
              data-testid="tag-input"
              id="tag"
              value={ tag }
              name="tag"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {expenses.map((item) => (
              <tr key={ item.id }>
                <td>{item.description}</td>
                <td>{item.tag}</td>
                <td>{item.method}</td>
                <td>{Number(item.value).toFixed(2)}</td>
                <td>{item.exchangeRates[item.currency].name.split('/')[0]}</td>
                <td>
                  {Number(item.exchangeRates[item.currency].ask).toFixed(2)}
                </td>
                <td>
                  {Number(
                    item.exchangeRates[item.currency].ask * item.value,
                  ).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    value="Editar despesa"
                    onClick={ () => edit(item.id, item.exchangeRates) }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => remove(item.id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fetchReq: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchTwo: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
  remove: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired,
  editUp: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  exchangeRates: PropTypes.objectOf(PropTypes.objectOf),
};

Wallet.defaultProps = {
  exchangeRates: {},
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
  editor: state.wallet.editor,
  id: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReq: () => dispatch(requestAPI()),
  fetchTwo: (expenses) => dispatch(requestApiTwo(expenses)),
  remove: (id) => dispatch(removeDespesa(id)),
  edit: (id, exchangeRates) => dispatch(editAction(id, exchangeRates)),
  editUp: (newState) => dispatch(editUpdate(newState)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
