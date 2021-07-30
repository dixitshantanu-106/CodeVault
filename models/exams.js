const mongoose = require('mongoose');

//creating studentSchema
const examSchema = new mongoose.Schema({
    ecode: {type: Number, require: true},
    date: {type: Date, require: true},
    stime: {type: String, require: true},
    etime: {type: String, require: true},
    pLang: {type: String, require: true},
    question: {type: String, require: true},
    testCases: [{
        input: {type: String, require: true},
        output: {type: String, require: true}
    }],
    class :{type: String , require: true},
    tEmail: {type: String, require: true}
});

//creating student collection
const Exam = mongoose.model("Exam",examSchema);

module.exports = Exam;