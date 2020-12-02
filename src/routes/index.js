const router = require('express').Router();
const user = require('./users')
const admin = require('./admin')
const notice = require('./notice')
const book = require('./book')

router.use("/user", user)
router.use("/admin", admin)
router.use("/notice", notice)
router.use("/book", book)

module.exports = router;