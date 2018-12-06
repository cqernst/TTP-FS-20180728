const Sequelize = require('sequelize');
const db = require('../db.js');

const Transaction = db.define('transactions', {
	stock_symbol: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	price: {
		type: Sequelize.DECIMAL(7, 2),
		allownNull: false,
	},
	total: {
		type: Sequelize.INTEGER,
	},
});

const getTotal = async function(transaction) {
	//find last transaction where the user sold or purchased stock from this company
	let lastEntry = await Transaction.findAll({
		limit: 1,
		where: {
			userId: transaction.userId,
			stock_symbol: transaction.stock_symbol,
		},
		order: [['createdAt', 'DESC']],
	});

	console.log('this is the last entry', lastEntry);

	/*Sets current total number of stocks that the user has from the company
	to the previous total plus or minus the amount being bought or sold in 
	the given transaction*/
	let lastTotal = lastEntry[0] ? lastEntry[0].total : 0;

	transaction.total = Number(lastTotal) + Number(transaction.quantity);
};

Transaction.beforeCreate(getTotal);

module.exports = Transaction;
