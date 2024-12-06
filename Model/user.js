const mongoose = require('mongoose')

// define schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        public_id:{
            type: String,
            require:true
        },
        url:{
            type: String,
            require:true
        }
    },
    role:{
        type:String,
        default:'student'

    }
},{timestamps:true})

const UserModal = mongoose.model('users',UserSchema)
module.exports = UserModal