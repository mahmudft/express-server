const jwt = require('jsonwebtoken')
require('dotenv').config()

const {TOKEN_SECRET, PASSWORD_SECRET} = process.env


function generatePassword(password){

    return jwt.sign(password, PASSWORD_SECRET)

}


 function verifyPassword(password, hash){
    try {
         const genPassword = jwt.verify(hash, PASSWORD_SECRET)
         console.log(genPassword)
         if(password == genPassword){
            return true
         }
         return false
    } catch (error) {
        console.log(error)
        return false
    }
}


function generateToken(user){
    return jwt.sign(user, TOKEN_SECRET)
}


function verifyToken(token){
    try {
       const data = jwt.verify(token, TOKEN_SECRET)
       return data
   } catch (error) {
       console.log(error)
       return false
   }

}

module.exports ={verifyToken, generateToken,verifyPassword, generatePassword}