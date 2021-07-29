const express = require('express');
const app = express();
const teacher = require('./routes/teacher');
const mongoose = require('mongoose');

app.use(express.json());
app.use('/teacher',teacher);

mongoose.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(()=>console.log('connected to database'))
    .catch(error=>console.log("Error while connecting to database\n"+error));

app.listen(3000,()=>console.log("Starting server at port 3k"));
