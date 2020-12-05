const { getUserByUuid } = require('../services/user');
const searchBook = async (req, res, next) => {
	let { search, page } = req.query;
	if (page == undefined) page = 1;
	const user = await getUserByUuid(req['decoded']['uuid']);
	const books = await searchByWord(search, page, user.school);
	res.status(200).json(books);
};

module.exports = { searchBook };
