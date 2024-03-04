require('./db/connection')
require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
const port = process.env.PORT || 8000;
const cookieparser = require("cookie-parser")
const UserRouter = require('./routes/user')
const BlogRouter = require('./routes/blog');

const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected to Database Successfully')
    app.listen(port, () => {
        console.log(`Listening at port no ${port}`)
    })
}).catch((err)=>{
    console.log(err)
})

app.set('view engine', 'ejs')
app.set('views', path.resolve("./views"))
app.use(express.json())
app.use(cookieparser())
app.use(express.static(path.resolve("./public")))
app.use(express.urlencoded({ extended: false }))

app.get('/',async (req, res) => {
    try {
        const user = req.user || null;
        if (user) {
            res.render('blogs', {
                user: req.user
            });
        } else {
            res.render('index', {
                user
            });
        }
    } catch (error) {
        console.error("Error fetching blog data:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.use('/user', UserRouter)
app.use('/blog', BlogRouter)