const HttpError = require('../exception/exception');
const { User, Loan } = require('../config/config');
const { hashPassword } = require('../utils/hash');
const { mkId } = require('../utils/mkId');
const { mkAccess } = require('../utils/mkToken');
const { getBookInfo } = require('./book');

const registerUser = async (userInfo) => {
	userInfo.password = await hashPassword(userInfo.password);
	userInfo.uuid = 'user-' + (await mkId());

	const isExisted = await User.findOne({
		where: {
			userId: userInfo.userId,
		},
	});

	if (isExisted) throw new HttpError(409, 'userId already exists');

	return await User.create(userInfo);
};

const findUser = async (userInfo) => {
	const user = await User.findOne({
		where: {
			userId: userInfo.userId,
			password: await hashPassword(userInfo.password),
		},
	});

	if (!user) throw (400, 'Wrong loginInfo');

	return await mkAccess(user.uuid, user.admin, process.env.JWT_SECRET_KEY);
};

const getUserInfoService = async (id) => {
	return await User.findOne({
		where: {
			uuid: id,
		},
		attributes: ['studentNo', 'name'],
	});
};

const getUserByUuid = async (id) => {
	return await User.findOne({
		where: { uuid: id },
	});
};

const getBookLoans = async (uuid) => {
	const list = await Loan.findAll({
		where: {
			user_uuid: uuid,
		},
	});

	const result = await Promise.all(
		list.map(async (value) => {
			const book = await getBookInfo(value.bookId);
			return {
				title: book.title,
				loanDate: book.createAt,
				returnDate: book.deletedAt,
				image: book.image,
				location: book.location,
			};
		}),
	);

	return { book: result };
};

module.exports = {
	registerUser,
	findUser,
	getUserInfoService,
	getUserByUuid,
	getBookLoans,
};
