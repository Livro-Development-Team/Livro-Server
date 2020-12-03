const db = require('../config/config');

const getBookInfo = async (bookId) => {
	return await db.Book.findOne({
		where: {
			id: id,
		},
	});
};

module.exports = { getBookInfo };
