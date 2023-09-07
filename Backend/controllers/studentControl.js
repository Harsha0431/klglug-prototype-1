const { response } = require('express');
const User = require('../models/Student');


const calculateCredits = (points)=>{
    return (points/40).toFixed(2);
}

// const points = 75;

// const temp = new User({
//     name:'Rahul Kavuri',
//     id:'2200033018',
//     points:points,
//     credits:calculateCredits(points),
// })

// temp.save()

// const addMany = async()=>{
//     await User.updateMany({}, { $set: { role: 'student' } });
// }
// addMany();

exports.getAllStudentList = async(req , res) =>{
    try{
        const list = await User.find();
        res.json(list);
    }
    catch(err){
        res.status(500).json({ error: 'Error getting Stuents' });
    }
};

exports.addStudent = async(req , res) =>{
    // console.log("Came Here to AddStudent data is " + JSON.stringify(req.body));
    const { name , id , points } = req.body ;
    const credits = calculateCredits(points);
    try{
        const result = await User.create({
            id:id ,
            name:name ,
            points:points,
            credits: credits,
            role:'student'
        });
        res.json({code:1});
        console.log("Added Successfully")
    }
    catch(err){
        if (err.code === 11000) {
            console.log('Student with this ID already exists.');
        }
        console.log("Error in adding student : " + err.message);
        res.status(400).json({code:0});
        return;
    }
}

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { points } = req.body;
    const credits = calculateCredits(points);
    console.log("Tried to Update ...")
    try {
        const result = await User.updateOne({ id: id }, { $set: { points, credits } });
        res.json(result);
        console.log("Data updated ");
    } catch (err) {
        console.log("Failed to Update ...");
        res.status(500).json({ error: 'Error updating todo' });
    }
};