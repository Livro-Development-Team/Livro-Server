const AdminService = require('../services/admin');

const adminAuth = async (req, res, next) => {
	const secret = req.app.get('jwt-secret');
	const accessToken = await AdminService.adminAuthService(req.body, secret);
	res.status(200).json({ accessToken });
};

module.exports = { adminAuth };
