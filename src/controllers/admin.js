const AdminService = require('../services/admin');

const adminAuth = async (req, res, next) => {
	const secret = req.app.get('jwt-secret');
	const accessToken = await AdminService.adminAuthService(req.body, secret);
	res.status(200).json({ accessToken });
};

const writeNotice = async (req, res, next) => {
	const { uuid, admin } = req['decoded'];
	await AdminService.writeNoticeService(req.body, uuid, admin);
	res.status(201).end();
};

const updateNotice = async (req, res, next) => {
	const noticeId = req.params.id;
	const { uuid, admin } = req['decoded'];
	await AdminService.updateNoticeService(req.body, noticeId, uuid, admin);
	res.status(200).end();
};

const deleteNotice = async (req, res, next) => {
	const noticeId = req.params.id;
	const { uuid, admin } = req['decoded'];
	await AdminService.deleteNoticeService(noticeId, uuid, admin);
	res.status(204).end();
};

const getLoanedBooks = async (req, res, next) => {
	const { uuid, admin } = req['decoded'];
	const { page, date } = req.query;
	const books = await AdminService.getLoanedBooksService(
		uuid,
		admin,
		page,
		date,
	);
	res.status(200).json(books);
};

module.exports = {
	adminAuth,
	writeNotice,
	updateNotice,
	deleteNotice,
	getLoanedBooks,
};
