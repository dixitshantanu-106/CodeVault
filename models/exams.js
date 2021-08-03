const mongoose = require('mongoose');
require('mongoose-type-email');

//creating studentSchema
const examSchema = new mongoose.Schema({
    ecode: {type: Number, require: true},
    date: {type: String, require: true},
    stime: {type: String, require: true},
    etime: {type: String, require: true},
    pLang: {type: String, require: true},
    question: {type: String, require: true},
    testCases: [{
        _id: false,
        input: {type: String, require: true},
        output: {type: String, require: true}
    }],
    className :{type: String , require: true},
    tEmail: {type: mongoose.SchemaTypes.Email, require: true}
});

//creating student collection
const Exam = mongoose.model("Exam",examSchema);

module.exports = Exam;
