const User = require('../models/User')


let getUserById = async(userId) =>{
    return await User.findOne({_id: userId}).select('-password -__v')
}
let getUserByEmail = async(email) =>{
    return await User.findOne({email:email}).select('-password -__v')
}

let getUserByEmailForLoggin = async(email) =>{
    return await User.findOne({email:email}).select('-__v')
}

let deleteUser= async (userId) =>{
    return await User.deleteOne({_id:userId})
}

let saveAnUser = async (user)=> {
    return await user.save()
}

module.exports.getUserById=getUserById
module.exports.getUserByEmail=getUserByEmail
module.exports.deleteUser=deleteUser
module.exports.getUserByEmailForLoggin=getUserByEmailForLoggin
module.exports.saveAnUser=saveAnUser