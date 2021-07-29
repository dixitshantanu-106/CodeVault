/* defining schema and collection for otp */
const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.connect('mongodb://localhost/codevault1')
    .then(()=>console.log("connected to database"))
    .catch(error=>console.log("Error while connecting with databse "+error));

const Otp = mongoose.model("Otp",new mongoose.Schema({
    email:{type:String,require:true},
    otp:{type:String,require:true},
    expireIn:{type:Number}
},{timestamps:true})); 

//function to check body of request
function validateForgot(body){
    const schema = Joi.object({
        email:Joi.string().email().required()
    });
    return schema.validate(body);
}

module.exports = {
    Otp,
    validateForgot
}


