const User = require('./User');
const Stock = require('./Stock');
const Transaction = require('./Transaction');

User.belongsToMany(Stock, { through: Transaction });
Stock.belongsToMany(User, { through: Transaction });

module.exports = {
	User,
	Stock,
	Transaction,
};
