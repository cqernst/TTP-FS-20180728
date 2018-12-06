import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store';

/**
 * COMPONENT
 */
const AuthForm = props => {
	const { name, displayName, handleSubmit, error } = props;

	return (
		<div className="transaction-form">
			<h4>Welcome, {name}</h4>
			<form onSubmit={handleSubmit} name={name}>
				<p className="cash"> Cash - {/* cash amount here */}</p>
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
				{error && error.response && (
					<div className="error-container">
						{' '}
						{error.response.data}{' '}
					</div>
				)}
			</form>
		</div>
	);
};
