const express = require('express');
const { generatePassword,verifyToken } = require('../auth/middleware')
const { User, Blog } = require('../models/userModel')
const userRouter = express.Router()

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

userRouter.post('/', async (req, res) => {
    const { name, email, username,surname, password } = req.body

    const hashedPassword = generatePassword(password)
    try {
        const user = await User.create({
            name, email,surname, username, password: hashedPassword
        })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

userRouter.post('/blog',authMiddleware, async (req, res) => {
    const { title, description } = req.body
    console.log(req.body)

    try {
        const blog = await Blog.create({title, description})
        const user = await User.findByIdAndUpdate(req.user._id, {$push: {posts: blog}}, {new: true})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

userRouter.post('/map',authMiddleware, async (req, res) => {
    const { github, linkedin } = req.body
    console.log(req.body)

    try {
        const user = await User.updateOne({username: req.user.username}, {socials: {linkedin, github}})
        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

userRouter.get('/', authMiddleware, async (req, res) => {
    // console.log(await User.aggregate([{$match : {"username": "user"}}, {$sort : {"username": -1}}]))
    console.log(await Blog.find({}).sort({title: -1}).where('title').in(['Test']).limit(3))   // WHERE age IN ["APPLE", "PEAR"]       gt(5)    lt(5)
    try {
        const user = await User.find({username: req.user.username}).populate("posts").sort({})

        res.json(user)
    } catch (error) {
        res.json(error)
    }
})

module.exports = userRouter;