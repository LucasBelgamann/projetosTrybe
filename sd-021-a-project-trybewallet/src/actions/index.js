// Coloque aqui suas actions
import { EXPENSES, EMAIL, REQ_API, REMOVE, EDIT, EDIT_UP } from './actionTypes';

const saveEmail = (value) => ({
  type: EMAIL,
  payload: value,
});

const saveWallet = (value) => ({
  type: EXPENSES,
  payload: value,
});

const actionApi = (value) => ({
  type: REQ_API,
  payload: value,
});

const removeDespesa = (id) => ({
  type: REMOVE,
  payload: {
    id,
  },
});

const editAction = (id, exchangeRates) => ({
  type: EDIT,
  id,
  exchangeRates,
});

const editUpdate = (payload) => ({
  type: EDIT_UP,
  payload,
});

const requestAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(actionApi(Object.keys(data).filter((e) => e !== 'USDT')));
};

const requestApiTwo = (expenses) => async (dispatch) => {
  const response2 = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data2 = await response2.json();
  dispatch(saveWallet({ ...expenses, exchangeRates: data2 }));
};

export {
  saveEmail,
  saveWallet,
  requestAPI,
  actionApi,
  requestApiTwo,
  removeDespesa,
  editAction,
  editUpdate,
};
