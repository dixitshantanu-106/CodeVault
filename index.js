const express = require('express');
const app = express();
const teacher = require('./routes/teachers');
const exam = require('./routes/exams');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/codevault.com/teachers',teacher);
app.use('/codevault.com/exams',exam);

mongoose.connect('mongodb://localhost/codeVaultTest1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>console.log('connected to database'))
    .catch(error=>console.log("Error while connecting to database\n"+error));

app.listen(3000,()=>console.log("Starting server at port 3k"));
