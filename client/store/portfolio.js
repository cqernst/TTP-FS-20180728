import axios from 'axios';
import history from '../history';

let socket = {};
/**
 * ACTION TYPES
 */
const SET_PORTFOLIO = 'SET_PORTFOLIO';

/**
 * INITIAL STATE
 */
const defaultPortfolio = [];

/**
 * ACTION CREATORS
 */
const setPortfolio = portfolio => ({
  type: SET_PORTFOLIO,
  portfolio,
});

/**
 * THUNK CREATORS
 */
export const createPortfolio = transactions => async dispatch => {
  let symbols = new Set();
  let portfolio = [];
  /*because transactions are chronologically ordered, the first transaction we find in the array
    for a given stock symbol will have the most current total count for that stock symbol*/
  for (let i = 0; i < transactions.length; i++) {
    let transaction = transactions[i];

    if (!symbols.has(transaction.stock_symbol)) {
      symbols.add(transaction.stock_symbol);
      //query the stock's opening price and place it as a value on the transaction
      const quote = await axios.get(
        `https://api.iextrading.com/1.0/stock/${transaction.stock_symbol}/quote`
      );
      transaction['openPrice'] = quote.data.open;
      portfolio.push(transaction);
    }
  }

  dispatch(setPortfolio(portfolio));

  //create list of stocks owned by this user
  let subscriptions = portfolio.map(entry => entry.stock_symbol).join(',');
  console.log('subscriptions', subscriptions);

  //establish socket connection
  socket = require('socket.io-client')(
    'https://ws-api.iextrading.com/1.0/tops'
  );

  //handle messages coming through the socket connection
  socket.on('message', message => {
    console.log(message);
    message = JSON.parse(message);

    let updatedPortfolio = portfolio.map(entry => {
      if (
        message['symbol'].toLowerCase() === entry.stock_symbol.toLowerCase()
      ) {
        entry['currentPrice'] = message['lastSalePrice'];
      }
      return entry;
    });

    dispatch(setPortfolio(updatedPortfolio));
  });

  // // Connect to the channel
  socket.on('connect', () => {
    // Subscribe to updates on the user's portfolio
    socket.emit('subscribe', subscriptions);
  });
};

/**
 * REDUCER
 */
export default function(state = defaultPortfolio, action) {
  switch (action.type) {
    case SET_PORTFOLIO:
      return action.portfolio;
    default:
      return state;
  }
}
