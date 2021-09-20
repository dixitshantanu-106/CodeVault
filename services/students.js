const Student = require('../models/students');
const Joi = require('joi');

function validate(student) {
    const schema = Joi.object({
        sEmail: Joi.string().email().required().trim(),
        name: Joi.string().required().trim(),
        className: Joi.string().required().trim()
    });

    return schema.validate(student); 
};


//function to add Student
async function addStud(student) {
    const tstudent = new Student({
        sEmail: student.sEmail,
        name: student.name,
        className: student.className
    });
    return await tstudent.save();
};
 
// Get a student related to a particular class
async function getStud(sid, classreq) {
    return await Student.find({sEmail: sid, className: classreq},{className:0 });
};

// Check if a student with a particular mail already exists
async function studExists(sid) {
    return await Student.exists({sEmail: sid});
};

// Check if a student with a particular mail has a specified class
async function classExits(sid, name) {
    return await Student.exists({sEmail: sid, className: name});
};
 
// Get all students related to a specific teacher
async function getAllStud(classreq) {
    return await Student.find({className: classreq},{className:0});
};

//delete the student from a class
async function delStud(sid, classreq) {
    const result = await Student.findOneAndUpdate({sEmail: sid}, {$pull: {className: classreq}}, {new: true});
    if (result) if (result.tEmail.length == 0) return await Student.findOneAndRemove({sEmail: sid}, {new: true})
    return result
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
exports.classExits = classExits;
exports.addClass = addClass;
exports.addTeach = addTeach;