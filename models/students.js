const mongoose = require('mongoose');
require('mongoose-type-email');

//creating studentSchema
const studentSchema = new mongoose.Schema({
    sEmail: {type: mongoose.SchemaTypes.Email,require:true},
    name: {type: String, require: true},
    className: [{
        _id: 0,
        name: {type: String, require: true},
        tEmail: {type: mongoose.SchemaTypes.Email,require:true}
    }]
});

//creating student collection
const Student = mongoose.model("Student",studentSchema);

//export the student Colletion object
module.exports = Student;  