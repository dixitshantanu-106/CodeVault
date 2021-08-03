const Exam = require('../models/exams');
const Joi = require('joi');

function validate(exam) {
    const data = Joi.object({
        input: Joi.string().required().trim(),
        output: Joi.string().required().trim()
    });
    const schema = Joi.object({
        date: Joi.string().required().trim(),
        stime: Joi.string().required().trim(),  
        etime: Joi.string().required().trim(),
        pLang: Joi.string().required().trim(),
        question: Joi.string().required().trim(),
        testCases: Joi.array().items(data),
        className: Joi.string().min(2).max(15).required().trim(),
        tEmail: Joi.string().email().required().trim()
    });
    return schema.validate(exam);
};

// Create new exams, needs to be updated later
async function addExam(exam) {
    const newExam = new Exam({
        ecode: exam.ecode, 
        date: exam.date, 
        stime: exam.stime, 
        etime: exam.etime, 
        pLang: exam.pLang, 
        question: exam.question, 
        testCases: exam.testCases, 
        className: exam.class, 
        tEmail: exam.tEmail
    });
    return await newExam.save();
};

// To fetch all the exams from DB created by a specific teacher
async function getAllExams(id) {
    return await Exam.find({tEmail: id});
};

// To fetch exams with specified code, needs to be updated later
async function getExam(tid, code) {
    return await Exam.find({tEmail: tid, ecode: code});
};

async function getCount() {
    return await Exam.countDocuments();
}

async function getEcode() {
    return await Exam.findOne({}).sort({_id:-1}).limit(1).select({ ecode: 1, _id: 0})
};

async function delExam(id) {
    return await Exam.remove({ecode: id}, {new: true});
};

exports.validate = validate;
exports.addExam = addExam;
exports.getAllExams = getAllExams;
exports.getExam = getExam;
exports.getCount = getCount;
exports.getEcode = getEcode;
exports.addExam.delExam = delExam;