require('express-async-errors'); 
const logger = require('./middleware/logmiddleware.');
const error = require('./middleware/error');   
const express = require('express');
const app = express();
const teacher = require('./routes/teachers');
const exam = require('./routes/exams');
const student = require('./routes/students');
const score = require('./routes/scores');
const mongoose = require('mongoose');


app.use(express.json());
app.use('/codevault.com/teachers', teacher);
app.use('/codevault.com/exams', exam);
app.use('/codevault.com/students', student);
app.use('/codevault.com/scores', score);

app.use(error);

mongoose.connect('mongodb://localhost/codeVaultTest1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>logger.info('connected to database'))
    .catch(error=>logger.error("Error while connecting to database\n"+error));

app.listen(5000,()=>{logger.info("Starting server at port 5k");console.log("Server started at port 5k");});
// const curDate = new Date().toLocaleString().split(',')[0];
const curHrs = new Date().getHours();
console.log(curHrs);
