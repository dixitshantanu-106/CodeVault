/* This file is use for checking the token passed is valid or not for teacher */
const jwt = require('jsonwebtoken');
async function auth(req,res,next){
    console.log("called the auth fucntion in auth.js");
    const token = req.header('xauthheader');
    if(!token) return res.status(401).send("Access denied. NO token found."); //if no token provided

    try{
        const decodedEmail = await jwt.verify(token,'jsonPrivateKey'); //this will return email store in payload if valid token
        //console.log("decodedEmail"+decodedEmail);
        req.userEmail = decodedEmail;
        next();
    }
    catch(ex){
        console.log(token);
        res.status(400).send("Invalid token"); //if invalid token provided
    }
    
}

//exporting middleware function
exports.auth = auth;