const express = require('express');
const router = express.Router();

const user = require('../controllers/User');

router.post('/create', user.userCreate);
router.post('/login', user.userLogin);
router.delete('/delete/:id', user.userDeleteSingle);
router.post('/checkEmail', user.userCheckEmailAvail);

module.exports = router;
