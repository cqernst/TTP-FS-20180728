import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, TransactionForm } from '../components';
import { List } from './List.js';
import { fetchTransactions } from '../store';

/**
 * COMPONENT
 */

// This is mocking the incoming data until we get it coming in live

// const portfolioData = {
// 	type: 'portfolio',
// 	listitems: [
// 		{ symbol: 'AALP', count: 12, price: 12.72 },
// 		{ symbol: 'AIG', count: 10, price: 1.05 },
// 		{ symbol: 'NFLX', count: 5, price: 14.8 },
// 	],
// };

// const transactionsData = {
// 	type: 'transactions',
// 	listitems: [
// 		{ symbol: 'AALP', count: 12, price: 12.72, transaction: 'buy' },
// 		{ symbol: 'AIG', count: 10, price: 1.05, transaction: 'sell' },
// 		{ symbol: 'NFLX', count: 5, price: 14.8, transaction: 'buy' },
// 	],
// };

export class UserHome extends Component {
	constructor(props) {
		super(props);
		this.state = { portfolioData: [] };
		this.composePortfolioData = this.composePortfolioData.bind(this);
	}

	componentDidMount() {
		this.props.getAllTransactions(this.props.userId);
		//subscribe to each stock's price using IEX sockets
	}

	componentDidUpdate(prevProps) {
		if (prevProps.transactions !== this.props.transactions) {
			this.composePortfolioData(this.props.transactions);
		}
	}

	/*componentWillUnmount() {
	//unsubscribe from all sockets
	}*/

	composePortfolioData(transactions) {
		let symbols = new Set();
		let portfolio = [];
		/*because transactions are chronologically ordered, the first transaction we find in the array
		for a given stock symbol will have the most current total count for that stock symbol*/
		for (let i = 0; i < transactions.length; i++) {
			let transaction = transactions[i];

			if (!symbols.has(transaction.stock_symbol)) {
				symbols.add(transaction.stock_symbol);
				portfolio.push(transaction);
			}
		}

		this.setState({ portfolioData: portfolio });
	}

	render() {
		const { name, balance, view, transactions } = this.props;
		return (
			<div>
				<Navbar />
				<div className="content">
					<div className="list-container">
						<List
							type={view}
							listItems={
								view === 'portfolio'
									? this.state.portfolioData
									: transactions
							}
						/>
					</div>
					{view === 'portfolio' ? (
						<div className="sidebar">
							<div>
								<h3>Welcome, {name}</h3>
							</div>
							<div>
								<h2>Account Balance: ${balance}</h2>
							</div>
						</div>
					) : (
						<TransactionForm balance={balance} />
					)}
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
		view: state.homepage,
		transactions: state.transactions,
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
