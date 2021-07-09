let makeFakeCharacter =(info)=>{
    const character ={
        name: info.name,
        race: info.race,
        classtype: info.classtype,
        sex: info.sex
    }
    return character
}

module.exports ={makeFakeCharacter}