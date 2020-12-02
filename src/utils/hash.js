const crypto = require('crypto');

const hashPassword = async (password) => {
	return await crypto
		.createHmac(process.env.HASH_ALGORITHM, process.env.PW_HASH_KEY)
		.update(password)
		.digest()
		.toString();
};

module.exports = hashPassword;
