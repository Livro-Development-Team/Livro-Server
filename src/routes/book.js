const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const tryCatchMiddleware = require('../middlewares/tryCatch');
const { searchBook } = require('../controllers/book');

router.get('/', authMiddleware, tryCatchMiddleware(searchBook)); //search books in one's school
router.get('/:id'); //get book info
router.post('/loan'); //borrow

module.exports = router;
