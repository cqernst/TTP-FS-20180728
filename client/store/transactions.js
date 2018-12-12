import axios from 'axios';
import history from '../history';
import { createPortfolio } from './';

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const CREATE_TRANSACTION = 'CREATE_TRANSACTION';

/**
 * INITIAL STATE
 */
const defaultTransactions = [];

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions,
});

/**
 * THUNK CREATORS
 */
export const fetchTransactions = userId => async dispatch => {
  try {
    const res = await axios.get(`api/transactions/${userId}`);
    let transactions = res.data;
    dispatch(getTransactions(transactions || defaultTransactions));
    dispatch(createPortfolio(transactions || defaultTransactions));
  } catch (err) {
    console.error(err);
  }
};

export const postTransaction = transaction => async dispatch => {
  try {
    console.log('inside postTransaction');
    const res = await axios.post(`api/transactions/`, transaction);
    dispatch(fetchTransactions(res.data.userId));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
}
