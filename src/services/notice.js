const db = require('../config/config');
const HttpError = require('../exception/exception');
const AdminService = require('./admin');

const getNoticeListService = async (uuid, page) => {
	const user = await AdminService.findOneUserByUuid(uuid);
	return db.Notice.findAll({
		where: { school: user.school },
		order: [['createdAt', 'DESC']],
		attributes: ['uuid', 'title', 'content', 'createdAt'],
		limit: 3,
		offset: (page - 1) * 3,
	});
};

const getLatestNoticeService = async (uuid) => {
	const user = await AdminService.findOneUserByUuid(uuid);
	return db.Notice.findOne({
		where: { school: user.school },
		order: [['createdAt', 'DESC']],
		attributes: ['uuid', 'title', 'content', 'createdAt'],
	});
};

const getDetailNoticeService = async (uuid) => {
	try {
		return await db.Notice.findOne({
			where: { uuid },
			attributes: ['uuid', 'title', 'content', 'createdAt'],
		});
	} catch (e) {
		throw new HttpError(404, 'Notice Not Found');
	}
};

module.exports = {
	getNoticeListService,
	getLatestNoticeService,
	getDetailNoticeService,
};
