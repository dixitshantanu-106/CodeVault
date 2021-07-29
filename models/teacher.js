const mongoose = require('mongoose');
const Joi = require('joi');
const jpc = require('joi-password-complexity');  

//creating studentSchema
const studentSchema = new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    marks:{type:Number,default:0}
});

//creating student collection
const Student = mongoose.model("Student",studentSchema);

//creating examSchema
const examSchema = new mongoose.Schema({
    examId:{type:Number,default:0,unique:true,require:true},
    date:{type:Date,require:true},
    duration:{type:Number,require:true},
    progLanguage:{type:String,default:"C"},
    question:{type:String,require:true},
    testCases:[
        {
            input:{type:String,require:true},
            output:{type:String,require:true}
    }],
    students:[studentSchema]
});

//creating Exam collection
const Exam = mongoose.model("Exam",examSchema);

//creating Teacher collection
const Teacher = mongoose.model("Teacher",new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    exams:[{type:mongoose.Schema.Types.ObjectId,ref:"Exam"}]
}));

//validation method for teacher
function validateTeacher(body){
    const complexity={min:6,max:20,upperCase:1,lowerCase:1,numeric:1,symbol:1};
    const vschema = Joi.object({
        email:Joi.string().required().email(),
        password:jpc(complexity).required()
    });
    return vschema.validate(body);
}


exports.Teacher = Teacher;
exports.validateTeacher = validateTeacher;

