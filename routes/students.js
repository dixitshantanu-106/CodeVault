const express = require('express');
const router = express.Router();
const {getStud, delStud, addStud, getAllStud, validate, studExists, addClass, addTeach, teachExists, classExits} = require('../services/students');

// Fetch all the students related to a particular teacher
router.get('/:tid', async (req, res) => {
    const student = await getAllStud(req.params.tid);
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
});

// Fetch a particular student related to a particular teacher
router.get('/:sid/:tid', async (req, res) => {
    const student = await getStud(req.params.sid, req.params.tid);
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
});

// Delete all the scores related to a particular student
router.delete('/:sid', async (req, res) => {
    const student = await delStud(req.params.sid, req.userEmail._id); //get teacher email from token
    if (!student) return res.status(404).send('Student with the specified info not available');
    res.status(200).send(student);
}); 

// Add a score for a particular student
router.post('/', auth , async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    req.body.tEmail = req.userEmail._id; //getting teacher email from token 
    const student = await addStud(req.body);
    if (!student) return res.status(404).send('Something went wrong');
    res.status(200).send(student);
});

module.exports = router;