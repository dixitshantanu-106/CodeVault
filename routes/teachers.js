const express = require('express');
const router = express.Router();
const {teacherCheck, addTeacher, validateTeacher, validateForgot, sendMail,loginTeacher,validateLogin} = require('../services/teachers');
const asyncMiddleware = require('../middleware/async');
const log = require('../middleware/logmiddleware.');

//route to add the teacher
router.post('/',async(req,res)=>{ 
    console.log("called teacher add teacher route");
    const {error} = validateTeacher(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let result = await teacherCheck(req.body.email);
    if(result) {
        const teacher = await addTeacher(req.body);
        res.status(200).send("Teacher added:"+teacher);
    }
    else return res.status(422).send("User linked to this email already exists.");
});

//route to login teacher
router.post('/login',async(req,res)=>{
    const {error} = validateLogin(req.body);
    if(error)
    {
        log.info(`Login failed`);
        res.status(400).send(error.details[0].message);
    } 
    
    let result = await loginTeacher(req.body);
    if(result!=false){
        log.info(`login succeed`);
        res.header("x-auth-token",result).send("Login succeed..");
    }
    else{
        res.status(400).send("Invalid email or password");
    }
})

//route to forgot password 
router.post('/forgotpassword',async(req,res)=>{
    const {error} = validateForgot(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const result = await sendMail(req.body.email);

    if(result != true){
        return res.status(200).send("New password is sent through mail please update it latter");
    }
    else{
        return res.status(400).send("Invalid email address");
    }
});



router.get('/',(req,res)=>{
    res.status(200).send("OK DONE");
})

//exporting router to access from index.js
module.exports = router;