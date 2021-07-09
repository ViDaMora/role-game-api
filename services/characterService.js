
const Character = require('../models/Character')


let listCharacters =async (req)=>{
        let userId = req.user.id
        const offset= parseInt(req.query.offset)       //number of the page 
        const limit = parseInt(req.query.limit)||2    //number of items per page 
        let characters = await Character.find({user: userId}).skip(offset*limit).limit(limit)
        return characters
}

let addCharacter = async (character)=> {
    return await character.save()
}

let patchCharacter = async ({characterName,nextLevel})=> {
    return await Character.updateOne({name:characterName},{ level: nextLevel })
}

let getCharacterByName = async (characterName)=> {
    return await Character.findOne({name:characterName})
}

let deleteCharacter = async(characterName) => {
    return await Character.deleteOne({name:characterName})
}
let deleteAllCharactersFromAUser= async(userId)=> {
    return await Character.deleteMany({user:userId})
}


module.exports.listCharacters=listCharacters
module.exports.addCharacter= addCharacter
module.exports.patchCharacter= patchCharacter
module.exports.getCharacterByName= getCharacterByName
module.exports.deleteCharacter= deleteCharacter
module.exports.deleteAllCharactersFromAUser=deleteAllCharactersFromAUser