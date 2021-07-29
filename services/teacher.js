const {mongoose} = require('../app');
const {Teacher,validateTeacher} = require('../models/teacher');
const {Otp} = require('../models/otp');
const bcrypt = require('bcrypt');
const randomPassword = require('generate-password'); 

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

//function to send mail for forgot password also create otp and store into Otp collection
async function sendMail(mailId){
    const userPresent = await Teacher.findOne({email:mailId}); //check teacher is already exists or not
    if(userPresent){
        var tempPassword = randomPassword.generate({length:12,numbers:true,symbols:true});
        console.log("Random generated password :"+tempPassword);
        var error = await nodemailerService(mailId,tempPassword);
        if(error){
            console.log("Email sent");
            var encrypted = await encryptPassword(tempPassword);
            userPresent.password = encrypted;
            var updateResult = await userPresent.save();
            return true;
            //$2b$10$JpHDDkHUBiRTinyMeoDCX.6ynEayIbtBmjkcvAQh5Hxw9R6pxYbci
        }
        else{
            return false;
        }
  
    }
    else{
        console.log("user is not present");
        return false;
    }
}

//method to call nodemailer and send mail
function nodemailerService(mail,newPassword){
    return new Promise((resolve,reject)=>{
        var nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport({
            service:"gmail",
            port:587,
            secure:false,
            auth:{
                user:"sameershinde5299@gmail.com",
                pass:"fbwhatsapp"
            }
        });
    
        var message = "User your new password is "+newPassword+"\n\n\n\nPlease update your password after login";
    
        var mailOptions = {
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
}


module.exports = {
    teacherCheck,
    encryptPassword,
    addTeacher,
    sendMail
}