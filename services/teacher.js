const mongoose = require('mongoose');
const {Teacher,validateTeacher} = require('../models/teacher_model');
const bcrypt = require('bcrypt');
 
mongoose.connect('mongodb://localhost/codevault1')
    .then(()=>console.log('Connected to database..'))
    .catch(error=>console.log('Error while connecting to database '+error));

//function to check whether teacher is alredy present or not
async function teacherCheck(emailId){
    const teacher = await Teacher.findOne({email:emailId}).count();
    if(teacher==0) {
        console.log("count is 0");
        return true;
    }
    else{
        console.log("count is not 0");
        return false;
    }
}

//function to encrypt the password of user to store into database
async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10);
    const encrypted = await bcrypt.hash(password,salt);
    console.log("Encrypted password "+encrypted);
    return encrypted;
}

//function to add new teacher into database
async function addTeacher(body){
            const hashedPassword = await encryptPassword(body.password); //get encrypted password
            const teach = new Teacher({email:body.email,password:hashedPassword});
            const result = await teach.save();
            //console.log(result);
            return result;
}

//function to send mail for forgot password
function sendMail(mailId){
    
}

exports.teacherCheck = teacherCheck;
exports.encryptPassword = encryptPassword;
exports.addTeacher = addTeacher;