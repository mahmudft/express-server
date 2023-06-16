const express = require('express')
const { generateToken, generatePassword,verifyPassword, verifyToken } = require('../auth/middleware')
const authRouter = express.Router()
const { User } = require('../models/userModel')

//  "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    if (!token) {
        return res.status(403).send('Auth failed')
    }
    const data = verifyToken(token)
    if (!data) {
        return res.status(403).send('Token is malformedor expired')
    }
    
    req.user = await User.findOne({username: data.username})

    next()

}


authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    const hashedPassword = generatePassword(password)
    try {
        const user = await User.findOne({email})
        console.log(user)
        if (user && verifyPassword(password, user.password)) {
            const token = generateToken({ username: user.username, id: user._id })
            return res.json({ 'token': token })
        }
        return res.send('User not found')
    } catch (error) {
        res.json(error)
    }


})


authRouter.post('/signup', async(req, res) => {
    const { username, password, email } = req.body
    console.log(req.body)

    const user = { username, password, email }
    user.password = generatePassword(password)
    console.log(user)
    const usr = await User.findOne({username})
    console.log(usr)
    if (!usr) {
        const usr = await User.create(user)
        console.log(user)
        return res.status(200).json(usr)
    }

    return res.status(404).json({ 'message': "User exists" })


})


authRouter.get('/user',authMiddleware, (req, res) => {
    console.log(req.user)
    return res.status(200).json(req.user)

})

module.exports = authRouter