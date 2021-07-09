const User = require('../models/User')
const Character = require('../models/Character')
const {validationResult} = require('express-validator')
const {getUserById,deleteUser,getUserByEmail} = require('../services/userService')
const {deleteAllCharactersFromAUser} = require('../services/characterService')


let UserInfo = async (req,res) => {

    try {
        const user = await getUserById(req.user.id)
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error: ' + err.message)
    }
}

let DeleteUser = async(req,res) => {
    
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        let {email} = req.body
        let user = await getUserByEmail(email)
        let userRequestId =req.user.id
        if(!user){
            return res.status(404).json({msg: 'User not found'})
        }

        if (user._id.toString() !== userRequestId) {
            return res.status(401).json({msg: 'Not authorized'})
        }

        //Separar
        
        await deleteUser(userRequestId)
        await deleteAllCharactersFromAUser(userRequestId)
        res.json({msg:"User removed"})


    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error: ' + err.message)
    }
}


module.exports ={UserInfo,DeleteUser}