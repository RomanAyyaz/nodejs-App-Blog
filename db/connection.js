const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/Blogify-2"
mongoose.connect(uri).then(()=>{
    console.log('Connected to Database Successfully')
}).catch((err)=>{
    console.log(err)
})