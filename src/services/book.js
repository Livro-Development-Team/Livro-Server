const { Op } = require('sequelize');
const db = require('../config/config');

const searchByWord = async (word, page, school) => {
	const { rows, count } = await db.Book.findAndCoundAll({
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
	const loaned = await db.Loan.findAll({
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

const getBookInfo = async (bookId) => {
	return await db.Book.findOne({
		where: {
			id: id,
		},
	});
};

module.exports = { searchByWord };
