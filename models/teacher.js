const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    fname: String,
    lname: String,
    empno: String,
    email: String,
    password: String,
    exams: [{
        examId: String,
        examDate: Date,
        examTopic: String,
        progLang: String,
        examQues: String,
        testCases: [
            {
                input: String,
                output: String
            }
        ],
        students: [
            {
                studId: String,
                password: String,
                score: Number
            }
        ]
    }],
});

