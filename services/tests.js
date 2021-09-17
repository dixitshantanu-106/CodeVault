const Test = require('../models/tests');
const Joi = require('Joi');

function validate(test) {
    const schema = Joi.object({
        ecode: Joi.number().required().trim(),
        date: Joi.string().required().trim(),  
        stime: Joi.string().required().trim(),  
        etime: Joi.string().required().trim(),
        code: Joi.string().required(),
        sEmail: Joi.string().required().trim(),
        marks: Joi.number().required().trim(),
    });
    return schema.validate(test);
};


async function addTest(test) {
    const newTest = new Test({
        ecode: test.ecode,
        date: test.date,
        stime: test.stime,
        etime: test.etime,
        code: test.code,
        sEmail: test.sEmail,
        marks: test.marks
    });
    return await newTest.save();
}

async function delTest(test) {
    
}