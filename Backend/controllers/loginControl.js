const LoginCredentials = require('../models/loginCredentials');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

const { loginUser } = require('./authController')


const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.getLoginStatus =async (req , res)=>{
    const {id , password} = req.body;
    try{
        console.log('Came to login control with ID : ' + id + ' and password : ' + password);
        const token = await loginUser(id , password) ;

        if(token){
            console.log("OK  Role : " + token.role);
            res.json({token:token.token , role:token.role , status:1});
        }
        else{
            res.json({status:10}); //Invalid Credentials
        }

    }catch(err){
        res.json({status:0});
    }
}