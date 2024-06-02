const jwt = require("jsonwebtoken");

 const verifyToken =async (req,res,next)=>{
    try {
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied")
        }
        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        } 
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next() //to pass controll to the next fuction
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).send("Invalid Token");
    }
}

module.exports = {
    verifyToken
}