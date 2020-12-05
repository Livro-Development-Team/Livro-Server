const {
	adminAuth,
	writeNotice,
	updateNotice,
	deleteNotice,
	getLoanedBooks,
	getDelaiedBooks,
	returnBook,
} = require('../controllers/admin');
const tryCatchMiddleware = require('../middlewares/tryCatch');
const authMiddleware = require('../middlewares/auth');
const router = require('express').Router();

router.post('/auth', tryCatchMiddleware(adminAuth)); //admin login
router.post('/notice', authMiddleware, tryCatchMiddleware(writeNotice)); //write notice
router.put('/notice/:id', authMiddleware, tryCatchMiddleware(updateNotice)); //update notice
router.delete('/notice/:id', authMiddleware, tryCatchMiddleware(deleteNotice)); //delete notice
router.get('/loan', authMiddleware, tryCatchMiddleware(getLoanedBooks)); //get loan list
router.delete('/loan/:id', authMiddleware, tryCatchMiddleware(returnBook)); //return book
router.get('/loan/delay', authMiddleware, tryCatchMiddleware(getDelaiedBooks)); //get delay list

module.exports = router;
