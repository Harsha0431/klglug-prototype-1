const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true,
    },
    name:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required: true,
        default:'admin',
    }
});

const AdminKL = new mongoose.model('admin' , AdminSchema);

export default AdminKL;