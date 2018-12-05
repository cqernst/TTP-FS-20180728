import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import '../public/style.css';
import history from './history';
import Routes from './react-routes';

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Routes />
			</div>
		</Router>
	</Provider>,
	document.getElementById('app')
);
