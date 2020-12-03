const db = require('../config/config');
const HttpError = require('../exception/exception');
const { hashPassword } = require('../utils/hash');
const { mkAccess } = require('../utils/mkToken');

const adminAuthService = async (adminAuthInfo, secret) => {
	const { userId, password } = adminAuthInfo;
	const user = await findOneUser(userId);
	if (!passwordCompare(password, user.password)) {
		throw new HttpError(404, 'User Not Found');
	}
	await isAdmin(user.admin);
	return await mkAccess(user.uuid, user.admin, secret);
};

const findOneUser = async (userId) => {
	try {
		return db.User.findOne({ where: { userId } });
	} catch (e) {
		throw new HttpError(404, 'User Not Found');
	}
};

const passwordCompare = async (password, hashedPassword) => {
	return (await hashPassword(password)) === hashedPassword;
};

const isAdmin = async (admin) => {
	if (!admin) throw new HttpError(409, 'User Not Admin');
};

module.exports = { adminAuthService };
