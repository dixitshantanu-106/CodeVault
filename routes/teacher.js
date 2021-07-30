const express = require('express');
const router = express.Router();
const {teacherCheck, addTeacher,validateForgot,validateTeacher,sendMail} = require('../services/teacher');
  
//route to add the teacher
router.post('/addteacher',async(req,res)=>{
    const {error} = validateTeacher(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let result = await teacherCheck(req.body.email);
    if(result){
            const teacher = await addTeacher(req.body);
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
    if(result) return res.status(200).send("New password has sent on your mail");
    return res.status(400).send("Please check your email..");
});



router.get('/',(req,res)=>{
    res.status(200).send("OK DONE");
})

//exporting router to access from index.js
module.exports = router;