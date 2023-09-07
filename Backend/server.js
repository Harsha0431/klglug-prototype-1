const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const studentRouter = require('./routes/studentRoute');
const loginRouter = require('./routes/loginRoute');

app.use(express.json());
app.use(cors());

require('dotenv').config()


const MONGODB_URI = process.env.MONGODB_URI ;
const PORT = process.env.PORT || 8080;


mongoose.connect(MONGODB_URI ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


app.use('/api/student' , studentRouter);
app.use('/api/login' , loginRouter);


app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`);
})