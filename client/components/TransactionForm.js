import React from 'react';
import { connect } from 'react-redux';
import { postTransaction } from '../store';

const TransactionForm = props => {
	const { name, balance, userId, handleSubmit } = props;

	return (
		<div className="transaction-form">
			<h4>Welcome, {name}</h4>
			<form onSubmit={evt => handleSubmit(evt, userId)} name={name}>
				<p className="cash"> Cash - {props.balance}</p>
				<div>
					<input name="ticker" type="text" placeholder="ticker" />
				</div>
				<div>
					<input name="quantity" type="text" placeholder="quantity" />
				</div>
				<div className="buy-button">
					<button className="button" type="submit">
						Buy
					</button>
				</div>
				{/*error && error.response && (
					<div className="error-container">
						{' '}
						{error.response.data}{' '}
					</div>
				)*/}
			</form>
		</div>
	);
};

const mapState = (state, props) => {
	return {
		name: state.user.name,
		balance: state.user.balance,
		userId: state.user.id,
	};
};

const mapDispatch = (dispatch, props) => {
	return {
		handleSubmit(evt, userId) {
			evt.preventDefault();
			const stock_symbol = evt.target.ticker.value;
			const quantity = evt.target.quantity.value;
			dispatch(postTransaction({ stock_symbol, quantity, userId }));
		},
	};
};

export default connect(
	mapState,
	mapDispatch
)(TransactionForm);
