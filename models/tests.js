const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    ecode: {type: Number, require: true},
    date: {type: String, require: true},
    sEmail: {type: mongoose.SchemaTypes.Email, require: true},
    stime: {type: String, require: true},
    etime: {type: String, require: true},
    code: {type: String, require: true},
    marks: {type: Number, require: true}
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;