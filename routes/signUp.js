var express = require('express');
var router = express.Router();
const {check} = require('express-validator')
const {SignUp} = require('../controller/signUpController')

router.post('/signup',[
    check('name','Name is required and must have 4 to 11 characters').not().isEmpty(),
    check('email','Email is required and must be valid').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min: 6}),
],SignUp)


module.exports = router