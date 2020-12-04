const { adminAuth, writeNotice } = require('../controllers/admin');
const tryCatchMiddleware = require('../middlewares/tryCatch');
const authMiddleware = require('../middlewares/auth');
const router = require('express').Router();

router.post('/auth', tryCatchMiddleware(adminAuth)); //admin login
router.post('/notice', authMiddleware, tryCatchMiddleware(writeNotice)); //write notice
router.put('/notice/:id'); //update notice
router.delete('/notice/:id'); //delete notice
router.get('/loan'); //get loan list
router.get('/loan/:id'); //return book
router.get('/loan/delay'); //get delay list

module.exports = router;
