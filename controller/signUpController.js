const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const User = require('../models/User')
const {getUserByEmail,saveAnUser} = require('../services/userService')


let SignUp = async (req,res) => {
let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {password, email, name} = req.body
    try{

        let user = await getUserByEmail(email)

        if(user){
            return res.status(404).json({msg: "User already exists"})
        }

        user = new User({
            name,
            email,
            password
        })

    
        const salt= await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt)
        await saveAnUser(user)

        const payload = {
            user:{id: user.id}
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn: "5h"},
        (err,token) => {
            if(err){ 
                throw err
            }
            res.json({token,name,email})
        })


    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server Error: '+err.message)}

}


module.exports ={SignUp}