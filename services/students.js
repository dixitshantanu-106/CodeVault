const Student = require('../models/students');
const Joi = require('joi');

function validate(student) {
    const schema = Joi.object({
        sEmail: Joi.string().email().required().trim(),
        name: Joi.string().required().trim(),
        className: Joi.array().items(Joi.string().required().trim()),
        tEmail: Joi.array().items(Joi.string().email().required().trim())
    });

    return schema.validate(student);
};

async function addStud(student) {
    const tstudent = new Student({
        sEmail: student.sEmail,
        name: student.name,
        className: student.className,
        tEmail: student.tEmail
    });
    return await tstudent.save();
};
 
async function getStud(sid, tid) {
    return await Student.find({sEmail: sid, tEmail: tid});
};

async function getAllStud(tid) {
    return await Student.find({tEmail: tid});
};

async function delStud(sid, tid) {
    return await Student.findOneAndRemove({sEmail: sid, tEmail: tid}, {new: true});
};

exports.validate = validate;
exports.addStud = addStud;
exports.getStud = getStud;
exports.delStud = delStud;
exports.getAllStud = getAllStud;
