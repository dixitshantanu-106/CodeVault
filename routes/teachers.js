const express = require('express');
const router = express.Router();
const {teacherCheck, addTeacher, validateTeacher, validateForgot, sendMail,loginTeacher,validateLogin, classExits, addClass, getClasses, getStudForClass, validateClass } = require('../services/teachers');
const log = require('../middleware/logmiddleware.');
const {auth} = require('../middleware/auth');


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
router.get('/classes', auth, async (req, res) => {
    const classes = await getClasses(req.userEmail.email);
    if(classes) return res.status(200).send(classes);
    else return res.status(404).send(`No classes found for ${req.userEmail.email}`);
});

// To get students of a particular class created by a teacher
router.get('/students/:name', auth, async (req, res) => {
    const students = await getStudForClass(req.params.name);
    if(students) return res.status(404).send(`No students found for ${req.params.name}`);
    return res.status(200).send(students);
});

// To add class to an existing teacher
router.put('/class', auth, async (req, res) => {
    const {error} = validateClass(req.body);
    if (error) return res.status(400).send(error.message.details[0]);
    if (await classExits(req.userEmail.email, req.body.className)) return res.status(400).send('Try with a different class name..');
    return res.status(200).send(await addClass(req.userEmail.email, req.body.className));
})

module.exports = router;