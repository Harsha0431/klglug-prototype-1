const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required: true
    },
    points:{
        type:Number,
        default:0,
        required: true
    },
    credits:{
        type:Number,
        required: true,
        default:0
    },
    role:{
        type:String,
        required:true,
        default:'student'
    }
});

const User = mongoose.model('student' , UserSchema);

module.exports = User ;