const Score = require('../models/scores');
const Joi = require('joi');


function validate(score) {
    const schema = Joi.object({
        ecode: Joi.number().required().trim(),
        marks: Joi.number().required().trim(),
        date: Joi.string().required().trim(),
        sEmail: Joi.string().email().required().trim()
    });

    return schema.validate(score);
};

function delGetValidate(score) {
    const schema = Joi.object({sEmail: Joi.string().email().required()});
    return schema.validate(score);
};

async function addScore(score) {
    const tscore  = new Score({
        ecode: score.ecode,
        marks: score.marks,
        date: score.date,
        sEmail: score.sEmail
    });
    return await tscore.save();
};
 
async function getScore(id) {
    return await Score.find({sEmail: id});
};

async function delScore(id) {
    return await Score.remove({sEmail: id}, {new: true});
};

exports.validate = validate;
exports.addScore = addScore;
exports.getScore = getScore;
exports.delScore = delScore;
exports.delGetValidate = delGetValidate;