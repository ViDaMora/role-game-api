const mongoose = require('mongoose')

const CharacterSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
        required: [true, 'Name is required.'],
        unique: [true, 'Name must be unique.'],
        minLength: [4, 'The minimum length of the character`s name is 4 characters'],
        maxLenght: [11, 'The maximum length of the character`s name is 11 characters'],
        lowercase: true
    },
    race:{
        type: String,
        required: [true, 'Character`s race is required.'],
        minLength: [3, 'The minimum length of the race is 3 characters'],
        lowercase: true,
        enum: {values: ['dwarf','human','elf','ent','orc','hobbit'], message: 'The {VALUE} race doesn`t exist'}
    },
    level:{
        type: Number,
        required: [true, 'Character`s level is required.'],
        min: [1, 'The minimum level of a character is 1.'],
        max: [100, 'The maximum level of a character is 100']
    },
    classtype:{
        type:String,
        required: [true, 'Character`s class is required.'],
        lowercase: true,
        enum: {values: ['warrior','paladin','hunter','rogue',
    'shaman','priest','warlock','monk'], message: 'Verify the current classes of the game'}
    },
    sex:{
        type: String,
        required: [true, 'Character`s sex is required.'],
        lowercase: true,
        enum: {values: ['male','female'], message: 'The only right values for sex is male or female'}
    },
    status:{
        type: String,
        required: [true, 'Character`s status is required.'],
        lowercase: true,
        enum: {values: ['connected','disconnected','banned','innactive']}
    }
})


module.exports=mongoose.model('character',CharacterSchema);