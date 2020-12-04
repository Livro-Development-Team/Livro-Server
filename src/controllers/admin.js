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

module.exports = { adminAuth, writeNotice };
