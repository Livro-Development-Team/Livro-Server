const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) res.status(401).json({ message: 'token required' });
	const bearer = token.split('Bearer ')[1];
	await jwt.verify(bearer, req.app.get('jwt-secret'), (err, decoded) => {
		if (err) res.status(403).json({ message: err.message });
		req['decoded'] = decoded;
		next();
	});
};

module.exports = authMiddleware;
