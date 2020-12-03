const { registerUser, findUser } = require('../services/user');

async function register(req, res, next) {
	await registerUser(req.body);
	res.status(201).end();
}

async function login(req, res, next) {
	const token = await findUser(req.body);
	res.status(200).json({
		accessToken: token,
	});
}

const getLoanList = (req, res, next) => {
	return;
};

const getUserInfo = (req, res, next) => {
	return;
};

module.exports = { register, login, getLoanList, getUserInfo };
