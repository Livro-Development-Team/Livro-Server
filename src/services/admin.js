const db = require('../config/config');
const HttpError = require('../exception/exception');
const { hashPassword } = require('../utils/hash');
const { mkId } = require('../utils/mkId');
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

const findOneUserByUuid = async (uuid) => {
	try {
		return db.User.findOne({ where: { uuid } });
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

const writeNoticeService = async (noticeInfo, uuid, admin) => {
	const noticeId = 'notice-' + (await mkId());
	const { title, content } = noticeInfo;
	const user = await findOneUserByUuid(uuid);
	await isAdmin(admin);
	await db.Notice.create({
		uuid: noticeId,
		title,
		content,
		userUuid: uuid,
		school: user.school,
	});
};

const updateNoticeService = async (updateNoticeInfo, noticeId, uuid, admin) => {
	const { title, content } = updateNoticeInfo;
	await isAdmin(admin);
	const notice = await findOneNotice(noticeId);
	if (notice.userUuid !== uuid) {
		throw new HttpError(409, 'Not My School Notice');
	}
	await notice.update({ title, content });
};

const findOneNotice = async (noticeId) => {
	try {
		return await db.Notice.findOne({ where: { uuid: noticeId } });
	} catch (e) {
		throw new HttpError(404, 'User Not Found');
	}
};

const deleteNoticeService = async (noticeId, uuid, admin) => {
	await isAdmin(admin);
	const notice = await findOneNotice(noticeId);
	if (notice.userUuid !== uuid) {
		throw new HttpError(409, 'Not My School Notice');
	}
	await notice.destroy();
};
module.exports = {
	adminAuthService,
	writeNoticeService,
	findOneUserByUuid,
	updateNoticeService,
	deleteNoticeService,
};
