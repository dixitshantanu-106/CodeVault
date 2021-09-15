const express = require('express');
const router = express.Router();
const {getStud, delStud, addStud, getAllStud, validate, studExists, addClass, addTeach, teachExists, classExits, getClassList} = require('../services/students');
const {auth} = require('../middleware/auth');


// Fetch all the students related to a particular teacher
router.get('/', auth ,async (req, res) => {
    // throw new Error("Could not get the students");
    const student = await getAllStud(req.userEmail.email);
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
});

//route to get list of class name created by teacher whose email present in token
router.get('/class', auth , async (req, res) => {
    const email = req.userEmail.email; //getting the mail from token
    const classlist = await getClassList(email);
    if(classlist) return res.status(200).send(classlist);
    return res.status(400).send("No class found");
});
 
// Fetch a particular student related to a particular teacher
router.get('/:sid', auth , async (req, res) => {
    const student = await getStud(req.params.sid, req.userEmail.email);
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
});

// Delete all the scores related to a particular student
router.delete('/:sid', async (req, res) => {
    const student = await delStud(req.params.sid, req.userEmail.email); //get teacher email from token
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
}); 

// Add a score for a particular student
// auth middleware removed for testing 
router.post('/',  auth ,async (req, res) => {
    console.log("Student method post route called");
    const {error} = validate(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
        } 
    req.body.tEmail = req.userEmail.email; //getting teacher email from token 
    if (await studExists(req.body.sEmail)) {
        if (! await teachExists(req.body.sEmail, req.body.tEmail)) await addTeach(req.body.sEmail, req.body.tEmail);
        if (! await classExits(req.body.sEmail, req.body.className)) await addClass(req.body.sEmail, req.body.className);
        return res.status(200).send("Student with this mail already exists"); 
    }
    const student = await addStud(req.body);
    if (!student) return res.status(404).send('Something went wrong');
    res.status(200).send(student);
});


 
module.exports = router;