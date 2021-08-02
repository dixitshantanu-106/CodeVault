const express = require('express');
const router = express.Router();
const {getStud, delStud, addStud, getAllStud} = require('../services/students');


router.get('/:tid', async (req, res) => {
    const student = await getAllStud(req.params.tid);
    if (!student) res.status(400).send('Student with the specified info not available');
    res.status(200).send(student);
});
// Fetch all the scores related to a particular student
router.get('/:sid/:tid', async (req, res) => {
    const student = await getStud(req.params.sid, req.params.tid);
    if (!student) res.status(400).send('Student with the specified info not available');
    res.status(200).send(student);
});

// Delete all the scores related to a particular student
router.delete('/:sid/:tid', async (req, res) => {
    const student = await delStud(req.params.sid, req.params.tid);
    if (!student) res.status(400).send('Student with the specified info not available');
    res.status(200).send(student);
});

// Add a score for a particular student
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    const student = await addStud(req.body);
    if (!student) res.status(400).send('Something went wrong');
    res.status(200).send(student);
})



module.exports = router;