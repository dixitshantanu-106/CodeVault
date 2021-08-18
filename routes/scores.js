const express = require('express');
const router = express.Router();
const {getScore, delScore, addScore, validate} = require('../services/scores');
 
// Fetch all the scores related to a particular student
router.get('/:id', async (req, res) => {
    const score = await getScore(req.params.id);
    if (!score) return res.status(404).send('Exam with the specified ecode not available');
    res.status(200).send(score);
})

// Delete all the scores related to a particular student
router.delete('/:id', async (req, res) => {
    const score = await delScore(req.params.id);
    if (!score) return res.status(404).send('Scores for the specified student not available');
    res.status(200).send(score);
});

// Add a score for a particular student
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    const score = await addScore(req.body);
    if (!score) return res.status(404).send('Something went wrong');
    res.status(200).send(score);
})



module.exports = router;