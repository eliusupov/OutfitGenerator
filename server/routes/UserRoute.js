const express = require('express');
const router = express.Router();

const user = require('../controllers/User');

router.post('/create', user.userCreate);
router.post('/login', user.userLogin);
router.get('/get', user.userGetAll);
router.delete('/delete/:id', user.userDeleteSingle);
router.post('/checkEmail', user.userCheckEmailAvail);
router.post('/saveResult', user.userSaveResult);
router.get('/getResult/:userId', user.userGetResult);

module.exports = router;
