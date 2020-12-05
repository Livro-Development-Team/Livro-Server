const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const tryCatchMiddleware = require('../middlewares/tryCatch');
const { searchBook, getBookInfo, borrowBook } = require('../controllers/book');

router.get('/', authMiddleware, tryCatchMiddleware(searchBook)); //search books in one's school
router.get('/:id', tryCatchMiddleware(getBookInfo)); //get book info
router.post('/loan', authMiddleware, tryCatchMiddleware(borrowBook)); //borrow

module.exports = router;
