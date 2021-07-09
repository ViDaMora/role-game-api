const jwt = require('jsonwebtoken')
const config = require('config')


let validSession = (req,res,next) => {

    const token = req.header('session-token')


    if(!token){
        return res.status(401).json({msg: 'No valid sesion token, authorization denied'})
    }

    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'))
        req.user = decoded.user;
        next()
    }catch(err){
        res.status(401).json({msg: 'Token is not valid'})
    }

}


module.exports = validSession