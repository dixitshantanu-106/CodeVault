const mongoose = require('mongoose');
require('mongoose-type-email');

//creating studentSchema
const studentSchema = new mongoose.Schema({
    email: {type: mongoose.SchemaTypes.Email,require:true, unique:true},
    name: {type: String, require: true},
    class: {type: String, require: true}
});

//creating student collection
const Student = mongoose.model("Student",studentSchema);

module.exports = Student;