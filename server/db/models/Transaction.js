const Sequelize = require('sequelize');
const db = require('../db.js');

const Transaction = db.define('transactions', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	total: {
		type: Sequelize.INTEGER,
	},
});

const getTotal = function(transaction) {
	//find last transaction where the user sold or purchased stock from this company
	let lastEntry = Transaction.findAll({
		limit: 1,
		where: {
			userId: transaction.userId,
			stockId: transaction.stockId,
		},
		order: [['createdAt', 'DESC']],
	});

	console.log('this is the last entry', lastEntry);

	/*Sets current total number of stocks that the user has from the company
	to the previous total plus or minus the amount being bought or sold in 
	the given transaction*/

	transaction.total = lastEntry[0].total + transaction.quantity;
};

Transaction.beforeCreate(getTotal);

module.exports = Transaction;
