const express = require('express');
const {mongoose} = require('../app');
const {Teacher,validateTeacher} = require('../models/teacher'); //get the teacher from model
const router = express.Router();
const {teacherCheck,encryptPassword, addTeacher,sendMail} = require('../services/teacher'); //get teacher from services
const {validateForgot} = require('../models/otp');

// mongoose.connect('mongodb://localhost/codevault1')
//     .then(()=>console.log("connected to database"))
//     .catch(error=>console.log(error));

//route to add the teacher
router.post('/addteacher',async(req,res)=>{
    //validate the body of the request
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

//route to forgot password 
router.post('/forgotpassword',async(req,res)=>{
    const {error} = validateForgot(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await sendMail(req.body.email);
    console.log("Result from sendMail function :"+result);
    if(result){
        return res.status(200).send("OTP has generated and sent to mail");
    }
    else{
        return res.status(400).send("Please check your email..");
    }
})



router.get('/',(req,res)=>{
    res.status(200).send("OK DONE");
})

module.exports = router;