const User = require('./User');
const Transaction = require('./Transaction');

Transaction.belongsTo(User);
User.hasMany(Transaction);

module.exports = {
	User,
	Transaction,
};
