const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    avatar:{
        type:String,
        default:'https://t3.ftcdn.net/jpg/02/45/56/32/360_F_245563273_ta8nvwM7f82oYdE0efJwyP5rfVuNarWJ.jpg'
    },
    role:{
        type:Number,
        default:0
    }
})

module.exports = User = mongoose.model('user',UserSchema);