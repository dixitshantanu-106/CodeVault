const mongoose = require('mongoose');
require('mongoose-type-email');

const teacherSchema = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    name: {type: String, require: true}
});

//creating Teacher collection
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
