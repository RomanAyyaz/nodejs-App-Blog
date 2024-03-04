const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const User = require('../models/user')
const {generateToken} = require('../middlewares/auth')
require('dotenv').config()
const signUpGet = (req,res)=>{
    const user = req.user || null;
    res.render('signup',{
        user
    })
}
const signUpPost = async(req,res)=>{
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
    // EMAIL GENERATE
    const  emails  = user.email;
    let config = {
        service : 'gmail',
        auth : {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Nodemailer",
            intro: "You have signed in!",
            table : {
                data : [
                    {
                        item : "Our Blog App",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : process.env.EMAIL,
        to : emails,
        subject: "signup complete",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })
    // ENDS HERE
    res.redirect('/')}
    else{
        res.send('password do not match')
    }
}

module.exports = {
    signUpGet,
    signUpPost
}
