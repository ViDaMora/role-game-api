const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
const validSession = require('../middleware/validSession')
const {UserInfo,DeleteUser} = require('../controller/userController')

router.get('/user',validSession,UserInfo)
router.delete('/user',[validSession,
check('email','Email is required for a delete request').isEmail()],DeleteUser)

module.exports = router