const Express = require('express')
require('dotenv').config()
const os = require('os')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const userRouter = require('./routers/users')
const authRouter = require('./routers/auth')
const parser = require('body-parser')
const server = Express()


const { MODE } = process.env

const { mongoose } = require('./models/userModel')

const DATABASE = MODE == 'test' ? 'stepTest' : "stepDB"


// use JSON middleware 
server.use(Express.json())
server.use(parser.urlencoded({ extended: true }))
server.use(cors())
// server.use(helmet({
//     xXssProtection: true,
// }))
server.use(morgan({ format: 'combined' }))

// const rateLimit = require('express-rate-limit')

// const limiter = rateLimit({
// 	windowMs: 2 * 60 * 1000, // 2 minutes
// 	max: 2, // Limit each IP to 2 requests per `window` (here, per 2 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//     message: "You have reached rate limit"
// })

// server.use(limiter)


server.use('/user', userRouter)
server.use('/auth', authRouter)



// server.use((req, res, next)=> {
//     console.log(`Time: ${new Date().getDate()}`)
//     if(req.headers.authorization){
//         next()
//     }
//     res.status(403).json({"message": 'Not authorized'})
// })



server.get('/health', (req, res) => {
    console.log(req.ip)
    res.json({ 'version': os.arch(), 'cpus': os.cpus(), 'platform': os.platform(), 'release': os.release() })
})


server.listen(process.env.PORT, () => {
    mongoose.connect(`mongodb://fatullayevm:M@hmud141747@cluster0.lchodzh.mongodb.net/test?retryWrites=true&ssl=false`).then((res) => {
        console.log(`Server is listening on port: ${process.env.PORT} `)
        console.log(`DB is listening on port: 27017 `)
    })
        .catch((err) => [
            console.log(err)
        ])

})



