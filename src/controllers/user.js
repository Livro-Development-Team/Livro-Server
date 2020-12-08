const {
	registerUser,
	findUser,
	getUserInfoService,
	getBookLoans,
} = require('../services/user');

const register = async (req, res, next) => {
	await registerUser(req.body);
	res.status(201).end();
};

const login = async (req, res, next) => {
	const token = await findUser(req.body);
	res.status(200).json({
		accessToken: token,
	});
};

const getLoanList = async (req, res, next) => {
	const uuid = req['decoded']['uuid'];
	const loanList = await getBookLoans(uuid);
	res.status(200).json(loanList);
};

const getUserInfo = async (req, res, next) => {
	const uuid = req['decoded']['uuid'];
	const user = await getUserInfoService(uuid);
	res.status(200).json(user);
};

module.exports = { register, login, getLoanList, getUserInfo };
