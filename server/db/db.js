const Sequelize = require('sequelize');

//You can rename the db, just make sure the name corresponds to the name of the db you create
const db = new Sequelize('postgres://localhost:5432/stockapp', {
	logging: false,
});

module.exports = db;
