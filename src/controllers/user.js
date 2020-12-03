const {
	registerUser,
	findUser,
	getUserInfoService,
} = require('../services/user');

async function register(req, res, next) {
	await registerUser(req.body);
	res.status(201).end();
}

const login = async (req, res, next) => {
	const token = await findUser(req.body);
	res.status(200).json({
		accessToken: token,
	});
};

const getLoanList = (req, res, next) => {
	return;
};

const getUserInfo = async (req, res, next) => {
	const uuid = req['decoded']['uuid'];
	const user = await getUserInfoService(uuid);
	res.status(200).json(user);
};

module.exports = { register, login, getLoanList, getUserInfo };
