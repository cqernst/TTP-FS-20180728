import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

/**
 * INITIAL STATE
 */
const defaultTransactions = [];

/**
 * ACTION CREATORS
 */
const getTransactions = user => ({ type: GET_TRANSACTIONS, transactions });

/**
 * THUNK CREATORS
 */
export const fetchTransactions = userId => async dispatch => {
  try {
    const res = await axios.get(`api/transactions/${userId}`);
    dispatch(getTransactions(res.data || defaultTransactions));
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