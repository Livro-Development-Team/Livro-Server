const HttpError = require('../exception/exception');
const db = require('../config/config');
const { hashPassword } = require('../utils/hash');
const { mkId } = require('../utils/mkId');

const registerUser = async (userInfo) => {
	userInfo.password = await hashPassword(userInfo.password);
	userInfo.uuid = 'user-' + (await mkId());

	const isExisted = await db.User.findOne({
		where: {
			userId: userInfo.userId,
		},
	});

	if (isExisted) throw new HttpError(409, 'userId already exists');

	return await db.User.create(userInfo);
};

const findUser = async (userInfo) => {
	const user = await db.User.findOne({
		where: {
			userId: userInfo.userId,
			password: await hashPassword(userInfo.password),
		},
	});

	if (!user) throw (400, 'Wrong loginInfo');

	return await mkAccess(user.uuid, user.admin, process.env.JWT_SECRET_KEY);
};

module.exports = { registerUser, findUser };
