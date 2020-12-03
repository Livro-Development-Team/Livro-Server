const jwt = require('jsonwebtoken');

const mkAccess = async (uuid, admin, secret) => {
	const token = await jwt.sign(
		{
			uuid,
			admin,
		},
		secret,
		{
			expiresIn: '50000m',
		},
	);
	return token;
};

module.exports = { mkAccess };
