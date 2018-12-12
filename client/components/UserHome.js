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
	componentDidMount() {
		this.props.getAllTransactions(this.props.userId);
	}

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
