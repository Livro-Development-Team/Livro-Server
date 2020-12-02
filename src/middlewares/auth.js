// jwt authenticaion 확인

const jwt = require('jsonwebtoken');

const authMiddleWare = async (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) res.status(401).json({ message: 'token required' });
	const bearer = token.split('Bearer ')[1];
	await jwt.verify(bearer);
};
