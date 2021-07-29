const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/codevault1')
    .then(()=>console.log('connected to database'))
    .catch(error=>console.log("Error while connecting to database\n"+error));

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

module.exports = Teacher;


