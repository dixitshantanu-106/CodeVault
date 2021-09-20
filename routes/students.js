const express = require('express');
const router = express.Router();
const {getStud, delStud, addStud, getAllStud, validate, studExists, addClass, classExits } = require('../services/students');
const {auth} = require('../middleware/auth');


// Fetch all the students related to a particular class
router.get('/:classreq', auth ,async (req, res) => {
    // throw new Error("Could not get the students");
    const student = await getAllStud(req.params.classreq);
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
});
 
// Fetch a particular student related to a particular class
router.get('/:sid/:classreq', auth, async (req, res) => {
    const student = await getStud(req.params.sid, req.params.classreq);
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
});

// Delete all the scores related to a particular student
router.delete('/:sid/:classreq', auth, async (req, res) => {
    const student = await delStud(req.params.sid, req.params.classreq); 
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
}); 

// To add students
router.post('/',  auth ,async (req, res) => {
    console.log("Student method post route called");
    const {error} = validate(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
        } 
    if (await studExists(req.body.sEmail)) {
        if (! await classExits(req.body.sEmail, req.body.className)) return res.status(200).send(await addClass(req.body.sEmail, req.body.className));
        else return res.status(400).send('Student already present in the class');
    }
    const student = await addStud(req.body);
    if (!student) return res.status(404).send('Something went wrong');
    res.status(200).send(student);
});


 
module.exports = router;