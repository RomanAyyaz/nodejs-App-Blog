const mongoose = require('mongoose');
const uri = "mongodb+srv://romanayaz7:1234@cluster0.h31qcuh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri).then(()=>{
    console.log('Connected to Database Successfully')
}).catch((err)=>{
    console.log(err)
})