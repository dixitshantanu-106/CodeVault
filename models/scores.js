const mongoose = require('mongoose');
require('mongoose-type-email');

//creating studentSchema
const scoreSchema = new mongoose.Schema({
    ecode: {type: Number, require: true},
    score: {type: Number, require: true},
    date: {type: Date, require: true},
    sEmail: {type: mongoose.SchemaTypes.Email,require:true},
});

//creating student collection
const Score = mongoose.model("Score",scoreSchema);

module.exports = Score;