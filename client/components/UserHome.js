import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
	const { name, balance } = props;

	return (
		<div>
			<div>
				<h3>Welcome, {name}</h3>
			</div>
			<div>
				<h2>Account Balance: ${balance}</h2>
			</div>
		</div>
	);
};

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		name: state.user.name,
		balance: state.user.balance,
	};
};

export default connect(mapState)(UserHome);
