const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    }
}, { timestamps: true })

blogSchema.post('findOneAndUpdate', async (doc, next) => {
    const user = await User.findById(doc.user_id)
    const email = new Email(user)
    if(doc.approved == true){
        email.message = "Admin Approved your parcel"
        email.send()
        next()
    }
    email.message = "Admin disapproved your parcel"
    email.send()
    next()
})


const userScheme =  new mongoose.Schema({
    name: {
        type: String
    },
    surname: {
        type: String,
    },
    username: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: function(arg){
                if(arg.length <4){
                    return false
                }
                return true
            },
            message: props => `${props.value}'s length is not bigger than 10`
        }
    },
    email: {
        required: true,
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(v);
            },
            message: props => `${props.value} is not a email address!`
          },
    },
    socials: {type: Map, of: String},
    password: {
        required: true,
        type: String
    },
posts: [{ref: "Blog", type: mongoose.Schema.Types.ObjectId}], // ["Blog"]   // {ref: "Blog", type: mongoose.Schema.Types.ObjectId}
    
}, {
    virtuals: {
        fullname: {
            get(){
                return this.name + ' ' + this.surname;
            }
        }
    },
    toJSON: {virtuals: true}
})

// userScheme.pre('save', (next) => {
//     console.log(this.email)
//     // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
//     if(this.email.includes('@')){
//         next()
//     }
//     console.log('Email is not true')
// })


const User = mongoose.model('User', userScheme)
const Blog = mongoose.model('Blog', blogSchema)
module.exports = {mongoose, User, Blog}