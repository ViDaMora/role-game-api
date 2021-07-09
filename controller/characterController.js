const {validationResult} = require('express-validator')
const Character = require('../models/Character')
const {listCharacters,addCharacter,getCharacterByName,patchCharacter,deleteCharacter} = require('../services/characterService')
const {getUserById} = require('../services/userService')


let GetCharacters = async (req,res)=>{
    try{
        let characters = await listCharacters(req)
        const searchByClass = req.query.class
        if(searchByClass)
           return res.json(characters.filter(character=> character.classtype==searchByClass))
        res.json(characters)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server error: '+ err.message)
    }
}




let CreateCharacter= async (req,res)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    } 
    const{name,race,sex,classtype} = req.body
    const userId = req.user.id
    try{
        let user = getUserById(userId)
        if(!user){
            return res.json({msg: "Sign Up for creating a character"})
        }
        const newCharacter = new Character({
            name:name,
            user:userId,
            race:race,
            classtype:classtype,
            level:1,
            sex:sex,
            status: 'innactive'
        })
        const character =await  addCharacter(newCharacter)
        res.json(character)
    }catch(err){
        console.error(err.message)
        res.status(500).send('Server Error: ' + err.message)

    }

}

let LevelUpCharacter = async (req,res)=>{
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name} = req.body
    try {

       let character = await getCharacterByName(name)
       let nextLevel= character.level+1
       if(nextLevel>=100){
          return res.json({msg: "Your character has reached the maximum level"})
       }
        await patchCharacter({name,nextLevel})
        character.level = nextLevel
        res.json(character)
        
    } catch (err){
        console.error(err.message)
        res.status(500).send('Server Error: ' + err.message)
    }
}


let DeleteCharacter = async(req,res) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try {
        let {name} = req.body
        let character = await getCharacterByName(name)
        if(!character){
            return res.status(404).json({msg: 'Character not found'})
        }

        if (character.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'})
        }

        await deleteCharacter(name)
        res.json({msg:"Character removed"})

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error: ' + err.message)
    }

}



module.exports= {GetCharacters,CreateCharacter,LevelUpCharacter,DeleteCharacter}

