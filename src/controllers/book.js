const { getUserByUuid } = require('../services/user');
const {
	searchByWordService,
	getBookInfoService,
	borrowBookService,
} = require('../services/book');
const searchBook = async (req, res, next) => {
	let { search, page } = req.query;
	if (page == undefined) page = 1;
	const user = await getUserByUuid(req['decoded']['uuid']);
	const books = await searchByWordService(search, page, user.school);
	res.status(200).json(books);
};

const getBookInfo = async (req, res, next) => {
	const bookInfo = await getBookInfoService(req.params.id);
	res.status(200).json(bookInfo);
};

const borrowBook = async (req, res, next) => {
	req.body['userUuid'] = req['decoded']['uuid'];
	await borrowBookService(req.body);
	res.staus(201).end();
};
module.exports = { searchBook, getBookInfo, borrowBook };
