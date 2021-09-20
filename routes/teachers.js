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
        res.status(422).send(error.details[0].message);
    } 
    
    let result = await loginTeacher(req.body);
    if(result!=false){
        log.info(`login succeed`);
        res.header("xauthheader",result).send("Login succeed..");
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
    if(result == true){
        log.info(`password reset`);
        return res.status(200).send("New password is sent through mail please update it latter");
    }
    else{
        return res.status(400).send("Invalid email address");
    }
});

// To get class names created by a teacher
router.get('/classes', async (req, res) => {

});

// To get students of a particular class created by a teacher
router.get('/students', async (req, res) => {

})

// To add class to an existing teacher
router.put('/class', async (req, res) => {

})

module.exports = router;