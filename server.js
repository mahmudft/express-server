const e = require('express')
const Express = require('express')
require('dotenv').config()

const server = Express()
server.use(Express.json())

let users = [
    { name: "User1", id: 1 },
    { name: "User2", id: 2 },
    { name: "User3", id: 3 },
    { name: "User4", id: 4 }
]

// server.get('/user', (req, res) => {
//     res.status(200).json(users)
// })

server.post('/user', (req, res) => {
    const { name, id } = req.body
    users.push({name, id})
    res.status(200).json(users)
})

// server.delete('/user', (req, res) => {
//     const { id } = req.body
//     users = users.filter(el => el.id != id)
//     res.status(200).json(users)
// })

// localhost:3001/user/1
server.delete('/user/:id', (req, res) => {
    const { id } = req.params
    if (id) {
        let user = users.find(el => el.id == id)
        users = users.filter(el => el.id != id)
        if (!user) {
            return res.json({"message" : "user is not found"})
        }
        return res.json(users)
    }
    return res.json({"message" : "id not provided"})
})

server.get('/health', (req, res) => {
    console.log(req.query)
    res.json({'version': '1.0.0'})
})

server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`)
})