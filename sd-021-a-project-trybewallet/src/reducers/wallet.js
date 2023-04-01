import { REQ_API, EXPENSES, REMOVE, EDIT, EDIT_UP } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  exchangeRates: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQ_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE:
    return {
      ...state,
      expenses: state.expenses.filter((remove) => remove.id !== action.payload.id),
    };
  case EDIT:
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
      exchangeRates: action.exchangeRates,
    };
  case EDIT_UP:
    return {
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }
        return item;
      }),
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
