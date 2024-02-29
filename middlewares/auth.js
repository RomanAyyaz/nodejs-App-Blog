const jwt = require('jsonwebtoken')
const SecretKey = "mynameissuperman%%%$"

const jwtMiddleware = (req,res,next) =>{
    const token = req.cookies.token
    if(!token){
       return  next()
    }
    try {
        const decoded = jwt.verify(token,SecretKey)
        req.user = decoded;
        next();
    } catch (error) {
        res.send(error)
    }
}
const generateToken = (user)=>{
    const payload = {
        _id :user._id,
        email:user.email
    }
    const token = jwt.sign(payload,SecretKey);
    return token;
}
module.exports = {
    generateToken,
    jwtMiddleware
}