const express = require('express');
const app = express();
const teacher = require('./routes/teacher');

app.use(express.json());

app.use('/teach',teacher);

//const PORT = 3000;

// const startServer = async (PORT, callback) => {
//     const server = app.listen(PORT, () => {
//         console.log(`Listening on port ${PORT}`);
//     }) 

//     if(callback) callback(server);
//     return server;
// }

//app.listen(3000,()=>{console.log("Listening on port no 3000")});

// module.exports = { getApp: () => app, listen : startServer}
app.listen(3000,()=>console.log("Starting server at port 3k"));