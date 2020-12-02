var Sequelize = require('sequelize');
var config = require('./database');

const db = {};

var sequelize = new Sequelize(
	config.database.database,
	config.database.user,
	config.database.password,
	{
		host: config.database.host,
		dialect: 'mysql',
		define: {
			timestamps: false,
		},
		timezone: '+09:00',
		dialectOptions: {
			dateStrings: true,
			typeCast: true,
		},
		pool: {
			max: 30,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		logging: false,
	},
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import model function from ../models/...js
var User = require('../models/user');
var Loan = require('../models/loan');
var Notice = require('../models/notice');
var Book = require('../models/book');

// Add model
db.User = User(sequelize, Sequelize);
db.Loan = Loan(sequelize, Sequelize);
db.Notice = Notice(sequelize, Sequelize);
db.Book = Book(sequelize, Sequelize);

module.exports = db;
