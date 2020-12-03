const router = require('express').Router();
const {
	login,
	register,
	getUserInfo,
	getLoanList,
} = require('../controllers/user.js');
const tryCatchMiddleware = require('../middlewares/tryCatch');
const authMiddleware = require('../middlewares/auth');

/* GET users listing. */
router.get('/', authMiddleware, tryCatchMiddleware(getUserInfo)); //user info - No, Name
router.get('/loans', authMiddleware, tryCatchMiddleware(getLoanList)); //user book loans
router.post('/', tryCatchMiddleware(login)); //login
router.post('/new', tryCatchMiddleware(register)); //sign-up

module.exports = router;
