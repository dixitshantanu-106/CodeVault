const Teacher = require('../models/teachers');
const Student = require('../models/students');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jpc = require('joi-password-complexity');
const randomPassword = require('generate-password'); 
const jwt = require('jsonwebtoken');

//Checking if the mail is present in DB
async function teacherCheck(emailId){
    const teacher = await Teacher.findOne({email:emailId}).countDocuments();
    if(teacher==0) return true;
    else return false;
}

//function to encrypt the password of user to store into database
async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

//validation method for teacher
function validateTeacher(body){
    const complexity={min:6,max:20,upperCase:1,lowerCase:1,numeric:1,symbol:1};
    const schema = Joi.object({
        email:Joi.string().required().email().trim(),
        name: Joi.string().required().min(3).max(25).trim(),
        password:jpc(complexity).required().trim()
    });
    return schema.validate(body);
}

//validation method for user login
function validateLogin(body){
    const schema = Joi.object({
        email:Joi.string().required().email().min(5).trim().email(),
        password:Joi.string().required().min(6).trim()
    });

    return schema.validate(body);
}

//function to for login teacer
async function loginTeacher(body){ 
    const teacher = await Teacher.findOne({email:body.email});
    console.log("Teacher present:"+teacher);
    if(!teacher)
    {
        return false;
    } 

    const validPassword = await bcrypt.compare(body.password,teacher.password);
    console.log("Passoword result:"+validPassword);
    if(!validPassword) 
    {
        return false;
    }

    const token = jwt.sign({email : teacher.email},"jsonPrivateKey");
    console.log("Token:"+token);
    return token;
}


//function to add new teacher into database
async function addTeacher(body){
    const hashedPassword = await encryptPassword(body.password); 
    const teach = new Teacher({name: body.name, email:body.email,password:hashedPassword});
    const result = await teach.save();
    return result;
}

//function to check body of request
function validateForgot(body){
    const schema = Joi.object({
        email:Joi.string().email().required()
    });
    return schema.validate(body);
} 

//function to send mail for forgot password also create otp and store into Otp collection
async function sendMail(mailId){
    const userPresent = await Teacher.findOne({email:mailId}); //check teacher is already exists or not
    if(userPresent){
        let tempPassword = randomPassword.generate({length:8,numbers:true,symbols:true,lowercase:true,uppercase:true});
        let result = await nodemailerService(mailId,tempPassword);
        console.log("nodemailService:"+result);
        if(result){
            userPresent.password = await encryptPassword(tempPassword);
            await userPresent.save();
            return true;
        }
        else return false;
    }
    else{
        console.log("user is not present");
        return false;
    }
}

//method to call nodemailer and send mail
function nodemailerService(mail,newPassword){
    console.log("In nodemailer");
    return new Promise((resolve,reject)=>{
        let nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            service:"gmail",
            port:587,
            secure:false, 
            auth:{
                user:"sameershinde5299@gmail.com",
                pass:"fbwhatsapp"
            }
        });
    
        let message = "User your new password is "+newPassword+"\n\n\n\nPlease update your password after login";
    
        let mailOptions = {
            from:"sameershinde5299@gmail.com",
            to:mail,
            subject:"CodeVault user forgot password",
            text:message
        }
    
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("Error while sending mail "+error);
                resolve(false);
            }
            else{
                console.log("Email sent");
                resolve(true);
            }
        });
    });
};

// Check if a teacher has a specified class
async function classExits(tid, name) {
    return await Teacher.exists({email: tid, className: name});
};

async function validateClass(body) {
    const data = Joi.object({
        email: Joi.string().email().required()
    });
    return data.validate(body);
}

// To add class in teacher document
async function addClass(tid, name) {
    return await Teacher.findOneAndUpdate({email: tid}, {$push: {className: name}}, {new: true});
}

// To get all classes created by a teacher
async function getClasses(tid) {
    return await Teacher.find({email: tid}, {_id: 0});
}

// To get students of a particular class 
async function getStudForClass(name) {
    return await Student.find({className: name}, {_id: 0, name: 1, sEmail: 1});
}

exports.teacherCheck = teacherCheck;
exports.encryptPassword = encryptPassword;
exports.addTeacher = addTeacher;
exports.sendMail = sendMail;
exports.validateTeacher = validateTeacher;
exports.validateForgot = validateForgot;
exports.loginTeacher = loginTeacher;
exports.validateLogin = validateLogin;
exports.classExits = classExits;
exports.addClass = addClass;
exports.getClasses = getClasses;
exports.getStudForClass = getStudForClass;
exports.validateClass = validateClass;