var express = require('express');
var router = express.Router();
const validSession = require('../middleware/validSession')
const {check} = require('express-validator')
const {GetCharacters,CreateCharacter,LevelUpCharacter, DeleteCharacter} = require('../controller/characterController')


router.post('/character',[validSession,
check('name','Character`s name is required').not().notEmpty().toLowerCase(),
check('race','Character`s race is required and must exist').toLowerCase().isIn(['dwarf','human','elf','ent','orc','hobbit']),
check('classtype','Character`s class is required and must exist: warrior,paladin,hunter,rogue,shaman,priest,warlock,monk').toLowerCase()
.isIn(['warrior','paladin','hunter','rogue',
'shaman','priest','warlock','monk']),
check('sex','Character`s sex is required an must be male or female').toLowerCase().isIn(['male','female']),
],CreateCharacter)

router.get('/character',validSession,GetCharacters)

router.patch('/character',[validSession,
check('name','Character`s name is required').not().notEmpty().toLowerCase()],LevelUpCharacter)

router.delete('/character',[validSession,
    check('name','Character`s name is required').not().notEmpty().toLowerCase()], DeleteCharacter)


module.exports = router

