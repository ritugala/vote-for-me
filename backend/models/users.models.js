const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {type:String, required:true},
    bio:{type:String},
    votes:{type:Number},
    img:{type:String},
    other_users: [{type:Boolean}]
})

const User = mongoose.model('Vote-User', userSchema)

module.exports = User;