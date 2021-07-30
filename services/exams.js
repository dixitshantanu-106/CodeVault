const Exam = require('../models/exams');
const Joi = require('joi');

function validate(exam) {
    const data = Joi.object({
        input: Joi.string().required(),
        output: Joi.string().required()
    });
    const schema = Joi.object({
        date: Joi.string().required(),
        stime: Joi.string().required(),
        etime: Joi.string().required(),
        pLang: Joi.string().required(),
        question: Joi.string().required(),
        testCases: Joi.array().items(data),
        class: Joi.string().min(2).max(15).required(),
        tEmail: Joi.string().email().required()
    });
    return schema.validate(exam);
};

async function addExam(exam) {
    const newExam = new Exam({
        ecode: exam.ecode, 
        date: exam.date, 
        stime: exam.stime, 
        etime: exam.etime, 
        pLang: exam.pLang, 
        question: exam.question, 
        testCases: exam.testCases, 
        class: exam.class, 
        tEmail: exam.tEmail
    });
    return await newExam.save();
};

exports.validate = validate;
exports.addExam = addExam;