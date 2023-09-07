const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        default:'klglug',
    }
});

const LoginCredentials = new mongoose.model('login' , loginSchema);

module.exports = LoginCredentials;