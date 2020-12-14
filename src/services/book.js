const { Op } = require('sequelize');
const { Loan, Book } = require('../config/config');

const searchByWordService = async (word, page, school) => {
	const { rows, count } = await Book.findAndCountAll({
		where: {
			title: {
				[Op.like]: `%${word}%`,
			},
			school: school,
		},
		limit: 5,
		offset: (page - 1) * 5,
	});

	const result = await Promise.all(
		rows.map(async (book) => {
			const { loanable, returnDate } = await getLoanState(book);
			return {
				id: book.id,
				title: book.title,
				author: book.author,
				publisher: book.publisher,
				category: book.category,
				location: book.location,
				loanable: loanable,
				returnDate: returnDate,
				image: book.image,
			};
		}),
	);
	return { book: result, pages: Math.ceil(count / 5) };
};

const getLoanState = async (book) => {
	const loaned = await Loan.findAll({
		where: {
			bookId: book.id,
		},
	});
	const loanable = !Boolean(loaned.length);
	let returnDate;
	if (!loanable) {
		returnDate = loaned[0].deletedAt;
	}
	return { loanable: loanable, returnDate: returnDate };
};

const getBookInfoService = async (bookId) => {
	return await Book.findOne({
		where: {
			id: id,
		},
	});
};

const borrowBookService = async (borrowBookInfo) => {
	const count = await Loan.count({
		where: {
			user_uuid: borrowBookInfo.userUuid,
		},
	});
	if (count >= 3) throw new HttpError(409, 'already loaned 3books');

	const book = await Book.findOne({
		where: {
			id: borrowBookInfo.id,
		},
	});

	const { loanable, returnDate } = await getLoanState(book);
	if (!loanable) throw new HttpError(400, 'already loaned book');

	await Loan.create({
		uuid: 'loan-' + (await mkId()),
		userUuid: borrowBookInfo.userUuid,
		bookId: borrowBookInfo.id,
		createdAt: borrowBookInfo.loanDate,
		deletedAt: borrowBookInfo.returnDate,
		school: book.school,
	});
};
module.exports = { searchByWordService, getBookInfoService, borrowBookService };
