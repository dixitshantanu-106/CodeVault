const express = require('express');
const app = express();
const teacher = require('./routes/teacher');

app.use(express.json());

app.use('/teacher',teacher);

app.listen(3000,()=>console.log("Starting server at port 3k"));