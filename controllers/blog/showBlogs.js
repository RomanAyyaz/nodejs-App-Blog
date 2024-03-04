const Blog = require('../../models/blog')
const Commnet = require('../../models/comment')
const User = require('../../models/user')
const showBlogGet = async(req,res)=>{
    const blogs = await Blog.find({})
    try {
        const user = req.user
        res.render('blogs',{
            user:user,
            blogs:blogs
        })
    } catch (error) {
        res.send(error)
    }
}
const showBlogWithId = async(req,res)=>{
    let blogId = req.params.id;
    const BlogData = await Blog.findById({_id: blogId});
    const Allcomments = await Commnet.find({OnBlog:blogId}).populate('postedBy')
    const userId= await User.findById({_id:BlogData.Createdby}) 
    res.render('showBlog',{
        user : userId,
        BlogData,
        Allcomments
    })
}
module.exports = {
    showBlogGet,
    showBlogWithId
}