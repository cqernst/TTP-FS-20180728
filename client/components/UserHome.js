import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar } from './Navbar.js';
import { List } from './List.js';
import { fetchTransactions } from '../store';

/**
 * COMPONENT
 */

// This is mocking the incoming data until we get it coming in live

const portfolioData = {
	type: 'portfolio',
	listitems: [
		{ symbol: 'AALP', count: 12, price: 12.72 },
		{ symbol: 'AIG', count: 10, price: 1.05 },
		{ symbol: 'NFLX', count: 5, price: 14.8 },
	],
};

const transactionsData = {
	type: 'transactions',
	listitems: [
		{ symbol: 'AALP', count: 12, price: 12.72, transaction: 'buy' },
		{ symbol: 'AIG', count: 10, price: 1.05, transaction: 'sell' },
		{ symbol: 'NFLX', count: 5, price: 14.8, transaction: 'buy' },
	],
};

export class UserHome extends Component {
	componentDidMount() {
		this.props.getAllTransactions(this.props.userId);
	}

	render() {
		const { name, balance } = this.props;
		return (
			<div>
				<Navbar />
				<div className="content">
					<div className="list-container">
						<List
							type={transactionsData.type}
							listitems={transactionsData.listitems}
						/>
					</div>
					<div className="sidebar">
						{/* Check if we are on the portfolio page, optionally render this section.
					Also, these should stack on top of each other on smaller screens? */}
						<div>
							<h3>Welcome, {name}</h3>
						</div>
						<div>
							<h2>Account Balance: ${balance}</h2>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		name: state.user.name,
		balance: state.user.balance,
		userId: state.user.id,
	};
};

const mapDispatch = dispatch => {
	return {
		getAllTransactions(userId) {
			dispatch(fetchTransactions(userId));
		},
	};
};

export default connect(
	mapState,
	mapDispatch
)(UserHome);
