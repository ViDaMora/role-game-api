const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {getUserByEmailForLoggin} = require('../services/userService')

let signIn = async (req, res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email, password} = req.body

    try{
        let user = await getUserByEmailForLoggin(email)
        if(!user){
            return res.status(400).json({msg: 'Invalid password or email'})
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(400).json({msg: 'Invalid password or email'})
        }

        const payload = {
            user:{id: user.id}
        }

        jwt.sign(payload,config.get('jwtSecret'),{expiresIn: "5h"},
        (err,token) => {
            if(err){ 
                throw err
            }
            res.json({token,email})
        })

    }catch(error){
        console.error(err.message)
        res.status(500).send('Server Err: ' + error.message)
    }
}


module.exports = {signIn}