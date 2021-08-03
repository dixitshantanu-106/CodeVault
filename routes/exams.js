const express = require('express');
const router = express.Router();
const {validate, addExam, getAllExams, getExam, getCount, getEcode, delExam} = require('../services/exams');

// To fetch all the exams from DB created by a specific teacher
router.get('/all/:id', async (req, res) => {
    const exam = await getAllExams(req.params.id);
    if (!exam) return res.status(404).send('No exam exists...');
    res.status(200).send(exam);
});

// To fetch exams with specified code, needs to be updated later
router.get('/:id', async (req, res) => {
    const exam = await getExam(req.params.id);
    if (!exam) return res.status(404).send('Exam with specified code not found');
    res.status(200).send(exam);
})

// Create new exams, needs to be updated later
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const count = await getCount();
    if (count == 0) req.body.ecode = 100001;
    else {
        let temp = await getEcode();
        req.body.ecode = temp.ecode + 1;
    }
    const exam = await addExam(req.body);
    if (!exam) return res.status(404).send('Something went wrong');
    res.status(200).send(exam);
});

// Delete the exam with specified ecode
router.delete('/:id', async (req, res) => {
    const exam = await delExam(req.params.id);
    if (!exam) return res.status(404).send('Exam with the specified ecode not available');
    res.status(200).send(movie)
});

module.exports = router;