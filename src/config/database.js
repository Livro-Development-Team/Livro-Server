var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const config = {
	test_module: false,
	database: {
		host: process.env.DB_HOST,
		port: 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DATABASE,
	},
};

module.exports = config;
