import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, TransactionForm } from '../components';
import { List } from './List.js';
import { fetchTransactions } from '../store';
import axios from 'axios';

/**
 * COMPONENT
 */

export class UserHome extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = { portfolioData: [] };
	// 	this.composePortfolioData = this.composePortfolioData.bind(this);
	// }

	componentDidMount() {
		this.props.getAllTransactions(this.props.userId);
	}

	// componentDidUpdate(prevProps) {
	// 	//if we have new transactions, update portfolio data
	// 	if (prevProps.transactions !== this.props.transactions) {
	// 		let transactions = this.props.transactions.slice();
	// 		this.composePortfolioData(transactions);
	// 	}
	// }

	componentWillUnmount() {
		// Disconnect from the channel
		//socket.on('disconnect', () => console.log('Disconnected.'));
	}

	// async composePortfolioData(transactions) {
	// 	let symbols = new Set();
	// 	let portfolio = [];
	// 	/*because transactions are chronologically ordered, the first transaction we find in the array
	// 	for a given stock symbol will have the most current total count for that stock symbol*/
	// 	for (let i = 0; i < transactions.length; i++) {
	// 		let transaction = transactions[i];

	// 		if (!symbols.has(transaction.stock_symbol)) {
	// 			symbols.add(transaction.stock_symbol);
	// 			//query the stock's opening price and place it as a value on the transaction
	// 			const quote = await axios.get(
	// 				`https://api.iextrading.com/1.0/stock/${
	// 					transaction.stock_symbol
	// 				}/quote`
	// 			);
	// 			transaction['openPrice'] = quote.data.open;
	// 			portfolio.push(transaction);
	// 		}
	// 	}

	// 	this.setState({ portfolioData: portfolio });
	// }

	render() {
		const { name, balance, view, transactions, portfolio } = this.props;
		return (
			<div>
				<Navbar />
				<div className="content">
					<div className="list-container">
						<List
							type={view}
							listItems={
								view === 'portfolio' ? portfolio : transactions
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
		portfolio: state.portfolio,
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
