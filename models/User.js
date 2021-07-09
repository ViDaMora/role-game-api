const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required.'],
        unique: [true, 'Name must be unique.'],
        minLength: [4, 'The minimum length of the name is 4 characters'],
        maxLenght: [11, 'The maximum length of the name is 11 characters'] ,
        lowercase: true
    },
    email:{
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'Email must be unique.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        lowercase: true
    },
    password:{
        type: String,
        required: true,
            minLength: [6, 'The minimum length of the password is 6 characters'],
    },
    date:{
        type: Date,
        default: Date.now
    },
})
module.exports=mongoose.model('user',UserSchema);