const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const LoginCredentials = require('../models/loginCredentials');



const JWT_SECRET = process.env.JWT_SECRET_KEY;

async function loginUser(id , password) {
    try {


        // bcrypt.hash(password, 10 , (err, hash) => {
        //     if (err) {
        //       console.error('Error hashing password:', err);
        //     } else {
        //       // Store 'hash' in your database as the user's hashed password
        //       console.log('Hashed Password:', hash);
        //     }
        //   });


        const user = await LoginCredentials.findOne({
            id: id
        });


        if (!user) {
            return null; //If user not found
        }


        const isPasswordMatch = (user.password==password);   //await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return null; // Incorrect password
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '5h' }); //JWT token generating
        return {token:token , role:user.role};
    } catch (error) {
        console.error('Error during login:', error);
        return null;
    }
}

module.exports = { loginUser };