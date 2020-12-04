const NoticeService = require('../services/notice');

const getLatestNotice = async (req, res, next) => {
	const uuid = req['decoed'].uuid;
	const latestNotice = await NoticeService.getLatestNoticeService(uuid);
};

const getNoticeList = async (req, res, next) => {
	const uuid = req['decoded'].uuid;
	const page = req.query.page;
	const noticeList = await NoticeService.getNoticeListService(uuid, page);
	res.status(200).json(noticeList);
};

const getDetailNotice = async (req, res, next) => {
	return;
};

module.exports = { getLatestNotice, getNoticeList, getDetailNotice };
