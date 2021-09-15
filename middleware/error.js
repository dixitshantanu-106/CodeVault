const log = require('./logmiddleware.');

// const log = createLogger({
//     transports:[
//     new transports.File({
//     filename: 'error.log',
//     format:format.combine(
//         format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
//         format.align(),
//         format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
//     )})
// ]});



 function error(err,req,res,next){
     console.log(err);
    log.error(err.message);//causing error
    res.status(500).send("Something failed..");
}

module.exports = error;
//response to send when something error happens called from async module