const Blog = require('../../models/blog')
const addBlogGet = (req,res)=>{
    res.render('addBlog',{
        user : req.user
    })
}
const addBlogPost =  async (req,res)=>{
    const{title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        Createdby: req.user._id
    })
    res.redirect(`showBlogs/${blog._id}`)
}
module.exports ={
    addBlogGet,
    addBlogPost
}