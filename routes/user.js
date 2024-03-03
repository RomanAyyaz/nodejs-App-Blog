const express = require('express')
const router = express.Router();
const {signinGet,siginPost} = require('../controllers/signin')
const {signUpGet,signUpPost} = require('../controllers/signup')
//User Signin Routes
router.get('/signin',signinGet)
router.post('/signin',siginPost)
// User signup route
router.get('/signup',signUpGet)
router.post('/signup',signUpPost)
//user del route
router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})
module.exports = router;