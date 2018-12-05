const Sequelize = require('sequelize');
const db = require('../db.js');

const Transaction = db.define('lineItems', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
});

const getTotal = function(transaction) {
	//find last transaction where the user purchased stock from this company
	let lastEntry = Transaction.findAll({
		limit: 1,
		where: {
			userId: this.userId,
			stockId: this.stockId,
		},
		order: [['createdAt', 'DESC']],
	});
};

Transaction.beforeCreate(getTotal);

module.exports = Transaction;
