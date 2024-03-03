const User = require("../models/user");
const Blog = require('../models/blog');
const bycryptjs = require('bcryptjs');
const {generateToken} = require('../middlewares/auth')
const signinGet = async (req,res)=>{
    const user = req.user || null;
    res.render('signin',{
        user
    })
}
const siginPost = async (req,res)=>{
    let email = req.body.email
    let userEnteredpass = req.body.password;
    let user  = await User.findOne({email})
    if(!user){
        res.send('invalid login details')
    }
    else{
    const allblogs = await Blog.find({})
    const password =user.password;
    try {
        let passwordChecked = await bycryptjs.compare(userEnteredpass,password)
        if(user && passwordChecked){
            const token =  generateToken(user)
            res.cookie('token', token)
            res.render('blogs',{
                user: user,
                blogs : allblogs
            })
        }
        else{
            res.send('invalid login details try again')
        }
    } catch (error) {
        res.send(error).redirect('/signin')
    }
    }
    
}
module.exports={
    signinGet,
    siginPost
}