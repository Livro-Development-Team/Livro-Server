const router = require('express').Router();
const {
	getLatestNotice,
	getNoticeList,
	getDetailNotice,
} = require('../controllers/notice');
const authMiddleware = require('../middlewares/auth');
const tryCatchMiddleware = require('../middlewares/tryCatch');

router.get('/', authMiddleware, tryCatchMiddleware(getNoticeList)); //get notice querystr : <page:int>
router.get('/:id', authMiddleware, tryCatchMiddleware(getDetailNotice)); //detail notice
router.get('/latest', authMiddleware, tryCatchMiddleware(getLatestNotice)); //loatest notice

module.exports = router;
