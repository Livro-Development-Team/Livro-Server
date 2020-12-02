const router = require('express').Router();
const {
	login,
	register,
	getUserInfo,
	getLoanList,
} = require('../controllers/user');
const tryCatchMiddleware = require('../middlewares/tryCatch');
/* GET users listing. */
router.get('/', (req, res, next) => getUserInfo(req, res, next)); //user info - No, Name
router.get('/loans', (req, res, next) => getLoanList(req, res, next)); //user book loans
router.post('/', (req, res, next) => login(req, res, next)); //login
router.post('/new', tryCatchMiddleware.Error(register)); //sign-up

module.exports = router;
