const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    body:{
        type:String,
        required:true
    },
    Createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

const Blog = mongoose.model("blog",BlogSchema)
module.exports = Blog