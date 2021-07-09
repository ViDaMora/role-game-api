var express = require('express');
var router = express.Router();
const {check} = require('express-validator')
const {signIn} = require('../controller/signInController')

router.post('/signin',[
    check('email','Email is required and must be valid').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min: 6}),
],signIn)


module.exports = router