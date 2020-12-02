const { HttpError } = require('http-errors');
const { User } = require('../models/user');
const { hashPassword } = require('../utils/hash');

const registerUser = async (userInfo) => {
	userInfo.password = await hashPassword(userInfo.password);
	userInfo.uuid = 'user-' + (await mkId());

	const isExisted = await User.findOne({
		where: {
			userId: userInfo.userId,
		},
	});

	if (isExisted) throw new HttpError(409, 'userId already exists');

	return await User.create(userInfo);
};

const findUser = async (userInfo) => {
	const user = await User.findOne({
		where: {
			userId: userInfo.userId,
			password: await hashPassword(userInfo.password),
		},
	});

	if (!user) throw new HttpError(400, 'Wrong loginInfo');

	return await mkAccess(user.uuid, user.admin, process.env.JWT_SECRET_KEY);
};

module.exports = (registerUser, findUser);
