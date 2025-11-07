const jwt = require("jsonwebtoken");
const adminCheck = (req, res, next) => {  
    const token = req.headers.authorization?.split(" ")[1]; 
    if(!token) throw new Error("user credentials not provided"); 
    try {
        const user = jwt.verify(token, process.env.jwt_key || "shhhh"); 
        if(user.role == "admin"){
            req.user = user;
            next(); 
        } else{
            return res.status(403).json({error : "Access denied"}); 
        }
    } catch (error) {
            return res.status(403).json({error : error.message});         
    }
}
module.exports = adminCheck; 
