const express = require('express');
const mongoose = require('mongoose');
const {Teacher,validateTeacher} = require('../models/teacher_model');
const router = express.Router();
const {teacherCheck,encryptPassword, addTeacher} = require('../services/teacher');

mongoose.connect('mongodb://localhost/codevault1')
    .then(()=>console.log("connected to database"))
    .catch(error=>console.log(error));


router.post('/',async(req,res)=>{
    console.log("post method called");
    const {error} = validateTeacher(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    //check if teacher is present or not
    let result = await teacherCheck(req.body.email);
    if(result==true){
            const teacher = await addTeacher(req.body);
            console.log("Teacher added .. "+teacher);
            res.status(200).send("Teacher added:"+teacher);
    }
    else{
        return res.status(400).send("User already present,Go and Login..");
    }
});



router.get('/',(req,res)=>{
    res.status(200).send("OK DONE");
})

module.exports = router;