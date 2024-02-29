const express = require('express')
const router = express.Router()
const bycryptjs = require('bcryptjs')
const User = require('../models/user')
const Blog = require("../models/blog")
const {generateToken , jwtMiddleware} = require('../middlewares/auth')
//User Signin Routes
router.get('/signin',(req,res)=>{
    const user = req.user || null;
    res.render('signin',{
        user
    })
})
router.post('/signin',async (req,res)=>{
    let email = req.body.email
    let userEnteredpass = req.body.password;
    let user  = await User.findOne({email})
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
})
// User signup route
router.get('/signup',(req,res)=>{
    const user = req.user || null;
    res.render('signup',{
        user
    })
})
router.post('/signup', async(req,res)=>{
    const {fullname, email,password,confirmpassword} = req.body;
    if(password === confirmpassword){
    const user = await User.create({
        fullname,
        email,
        password,
        confirmpassword
    })
    const token = generateToken(user)
    res.cookie('token',token)
    res.redirect('/')}
    else{
        res.send('password do not match')
    }
})
router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})
module.exports = router;