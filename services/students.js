const Student = require('../models/students');
const Joi = require('joi');

function validate(student) {
    const schema = Joi.object({
        sEmail: Joi.string().email().required().trim(),
        name: Joi.string().required().trim(),
        className: Joi.string().required().trim()
        // tEmail: Joi.string().email().required().trim()
    });

    return schema.validate(student);
};

//function to add Student
async function addStud(student) {
    const tstudent = new Student({
        sEmail: student.sEmail,
        name: student.name,
        className: student.className,
        tEmail: student.tEmail
    });
    return await tstudent.save();
};
 
// Get a student related to a particular teacher
async function getStud(sid, tid) {
    return await Student.find({sEmail: sid, tEmail: tid});
};

// Check if a student with a particular mail already exists
async function studExists(sid) {
    return await Student.exists({sEmail: sid});
};

// Check if a student with a particular mail has a specified class
async function classExits(sid, name) {
    return await Student.exists({sEmail: sid, className: name});
};

// Check if a student with a particular mail has a specified teacher
async function teachExists(sid, tid) {
    return await Student.exists({sEmail: sid, tEmail: tid});
};

// Get all students related to a specific teacher
async function getAllStud(tid) {
    return await Student.find({tEmail: tid});
};

//delete the student with his email
async function delStud(sid, tid) {
    return await Student.findOneAndRemove({sEmail: sid, tEmail: tid}, {new: true});
};

// Add teacher to an existing doc
async function addTeach(sid, tid) {
    await Student.findOneAndUpdate({sEmail: sid}, {$push: {tEmail: tid}});
    return true;
};

// Add class to an existing doc
async function addClass(sid, name) {
    await Student.findOneAndUpdate({sEmail: sid}, {$push: {className: name}});
    return true;
};

exports.validate = validate;
exports.addStud = addStud;
exports.getStud = getStud;
exports.delStud = delStud;
exports.getAllStud = getAllStud;
exports.studExists = studExists;
exports.teachExists = teachExists;
exports.classExits = classExits;
exports.addClass = addClass;
exports.addTeach = addTeach;