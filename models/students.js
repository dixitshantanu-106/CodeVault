const mongoose = require('mongoose');
require('mongoose-type-email');

//creating studentSchema
const studentSchema = new mongoose.Schema({
    sEmail: {type: mongoose.SchemaTypes.Email,require:true},
    name: {type: String, require: true},
    className: [{type: String, require: true}],
});

//creating student collection
const Student = mongoose.model("Student",studentSchema);

//export the student Colletion object
module.exports = Student;  