const router = require('express').Router();

router.post('/auth', ) //admin login
router.post('/notice', ) //write notice
router.put('/notice/:id', ) //update notice
router.delete('/notice/:id', ) //delete notice
router.get('/loan', ) //get loan list
router.get('/loan/:id', ) //return book
router.get('/loan/delay', ) //get delay list

module.exports = router;