const { User, Notice, Book, Loan } = require('../config/config');
const HttpError = require('../exception/exception');
const { hashPassword } = require('../utils/hash');
const { mkId } = require('../utils/mkId');
const { mkAccess } = require('../utils/mkToken');
const { Op } = require('sequelize');

const adminAuthService = async (adminAuthInfo, secret) => {
	const { userId, password } = adminAuthInfo;
	// SELECT * FROM user WHERE user_id = userid;
	const user = await findOneUser(userId);
	if (!passwordCompare(password, user.password)) {
		throw new HttpError(404, 'User Not Found');
	}
	await isAdmin(user.admin);
	return await mkAccess(user.uuid, user.admin, secret);
};

const findOneUser = async (userId) => {
	// SELECT * FROM user WHERE user_id = userId;
	try {
		return User.findOne({ where: { userId } });
	} catch (e) {
		throw new HttpError(404, 'User Not Found');
	}
};

const findOneUserByUuid = async (uuid) => {
	try {
		//SELECT * FROM user WHERE uuid = uuid;
		return User.findOne({ where: { uuid } });
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
	// INSERT INTO Notice(uuid, title, content, user_uuid, school) VALUES(noticeId,title, content, uuid, user.school);
	await Notice.create({
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
		// SELECT * FROM Notice WHERE uuid = noticeId;
		return await Notice.findOne({ where: { uuid: noticeId } });
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

const getLoanedBooksService = async (uuid, admin, page, date) => {
	await isAdmin(admin);
	const user = await findOneUserByUuid(uuid);
	const loans = await Loan.findAll({
		where: { school: user.school, deletedAt: { [Op.gte]: date } },
		attributes: ['uuid'],
		include: [
			{
				model: User,
				attributes: ['name', 'studentNo'],
			},
			{
				model: Book,
				attributes: ['title', 'author', 'publisher', 'category', 'image'],
			},
		],
		order: [['createdAt', 'DESC']],
		limit: 3,
		offset: (page - 1) * 3,
	});
	if (loans.length === 0) throw new HttpError(400, 'No Loan');
	return loans;
};

const getDelaiedBooksService = async (uuid, admin, page, date) => {
	await isAdmin(admin);
	const user = await findOneUserByUuid(uuid);
	const loans = await Loan.findAll({
		where: { school: user.school, deletedAt: { [Op.lt]: date } },
		attributes: ['uuid'],
		include: [
			{
				model: User,
				attributes: ['name', 'studentNo'],
			},
			{
				model: Book,
				attributes: ['title', 'author', 'publisher', 'category', 'image'],
			},
		],
		order: [['createdAt', 'DESC']],
		limit: 3,
		offset: (page - 1) * 3,
	});
	if (loans.length === 0) throw new HttpError(400, 'No Loan');
	return loans;
};

const returnBookService = async (admin, uuid) => {
	await isAdmin(admin);
	await Loan.destroy({ where: { uuid } });
};

module.exports = {
	adminAuthService,
	writeNoticeService,
	findOneUserByUuid,
	updateNoticeService,
	deleteNoticeService,
	getLoanedBooksService,
	getDelaiedBooksService,
	returnBookService,
};
