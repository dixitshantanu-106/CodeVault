const express = require('express');
const router = express.Router();
const {getScore, delScore, addScore, getScore, delGetValidate} = require('../services/scores');

// Fetch all the scores related to a particular student
router.get('/:id', async (req, res) => {
    const {error} = delGetValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    const score = await getScore(req.body.sEmail);
    if (!score) res.status(400).send('Exam with the specified ecode not available');
    res.status(200).send(score);
})

router.delete('/:id', async (req, res) => {
    const {error} = delGetValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    const score = await delScore(req.body.sEmail);
    if (!score) res.status(400).send('Exam with the specified ecode not available');
    res.status(200).send(score);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    const score = await addScore(req.body);
    if (!score) res.status(400).send('Something went wrong');
    res.status(200).send(score);
})



module.exports = router;