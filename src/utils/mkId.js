const uuid4 = require('uuid4');

const mkId = async () => {
	const id = await uuid4().split('-');
	return id[2] + id[1] + id[0];
};

module.exports = { mkId };
