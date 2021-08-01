const express = require('express');
const router = express.Router();
const Exam = require('../models/exams');
const {validate, addExam} = require('../services/exams');

// To fetch all the exams from DB
router.get('/', async (req, res) => {
    const exam = await Exam.find();
    if (!exam) return res.status(404).send('No exam exists...');
    res.status(200).send(exam);
});

// To fetch exams with specified code, needs to be updated later
router.get('/:id', async (req, res) => {
    const exam = await Exam.findOne({ecode: req.params.id});
    if (!exam) return res.status(400).send('Exam with specified code not found');
    res.status(200).send(exam);
})

// Create new exams, needs to be updated later
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const count = await Exam.countDocuments();
    if (count == 0) req.body.ecode = 100001;
    else {
        let temp = await Exam.findOne({}).sort({_id:-1}).limit(1).select({ ecode: 1, _id: 0});
        req.body.ecode = temp.ecode + 1;
    }
    const exam = await addExam(req.body);
    if (exam) res.status(200).send(exam);
    else res.status(400).send('Something went wrong');
});

// Delete the exam with specified ecode
router.delete('/:id', async (req, res) => {
    const exam = await Exam.remove({ecode: req.params.id}, {new: true});
    if (!exam) res.status(400).send('Exam with the specified ecode not available');
    res.status(200).send(movie)
});

module.exports = router;