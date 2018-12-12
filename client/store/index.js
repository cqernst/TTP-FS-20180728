import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import transactions from './transactions';
import portfolio from './portfolio';
import homepage from './homepage';

const reducer = combineReducers({ user, transactions, homepage, portfolio });
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: false }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './transactions';
export * from './homepage';
export * from './portfolio';
