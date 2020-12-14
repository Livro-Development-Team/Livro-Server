const NoticeService = require('../services/notice');

const getLatestNotice = async (req, res, next) => {
	const uuid = req['decoded'].uuid;
	const notice = await NoticeService.getLatestNoticeService(uuid);
	console.log('asdfasd', latestNotice);
	res.status(200).json(notice);
};

const getNoticeList = async (req, res, next) => {
	const uuid = req['decoded'].uuid;
	const page = req.query.page;
	const noticeList = await NoticeService.getNoticeListService(uuid, page);
	res.status(200).json(noticeList);
};

const getDetailNotice = async (req, res, next) => {
	const uuid = req.params.id;
	const notice = await NoticeService.getDetailNoticeService(uuid);
	res.status(200).json(notice);
};

module.exports = { getLatestNotice, getNoticeList, getDetailNotice };
