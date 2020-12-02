var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '.env') });
// Set Router
var routes = require('./routes');

// Set Sequelize
const sequelize = require('./config/config').sequelize;

var app = express();
sequelize
	.sync()
	.then(() => {
		console.log('DB connection success');
	})
	.catch((err) => {
		console.log('connect failed...');
		console.log(err);
	});

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set jwt secret key
app.set('jwt-secret', process.env.JWT_SECRET_KEY);

// Route handler
app.use('/', routes);

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
	res.status(404).json({
		message: err.message,
	});
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.json({ error: 'error', message: err });
});

module.exports = app;
