const Blog = require('../models/blog');
const express = require('express');
const User = require('../models/user')
const Commnet = require("../models/comment")
const router = express.Router();
const {jwtMiddleware}   = require('../middlewares/auth');
// post method to save blog data in databse
router.get('/addBlog',jwtMiddleware, (req,res)=>{
    res.render('addBlog',{
        user : req.user
    })
})
router.post('/addBlog',jwtMiddleware, async (req,res)=>{
    const{title,body} = req.body;
    const blog = await Blog.create({
        title,
        body,
        Createdby: req.user._id
    })
    res.redirect(`showBlogs/${blog._id}`)
}) 
//blogs view
router.get('/showBlog',jwtMiddleware,async(req,res)=>{
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
})

//Blogs to view on a seprate page
router.get('/showBlogs/:id',jwtMiddleware,async(req,res)=>{
    let blogId = req.params.id;
    const BlogData = await Blog.findById({_id: blogId});
    const Allcomments = await Commnet.find({OnBlog:blogId}).populate('postedBy')
    const userId= await User.findById({_id:BlogData.Createdby}) 
    res.render('showBlog',{
        user : userId,
        BlogData,
        Allcomments
    })
})
// comments likes
router.post("/comment/:commentId", jwtMiddleware, async (req, res) => {
    const commentId = req.params.commentId;
    let user = req.user
    try {
        const comment = await Commnet.findById(commentId);
        const hasLiked = comment.likes.includes(user._id);
        if (hasLiked) {
            comment.likes.pull(req.user._id);
        } else {
            comment.likes.push(req.user._id);
        }
        await comment.save();
        res.redirect('back');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
//Comment Route
router.post("/:id",jwtMiddleware,async(req,res)=>{
    let {comment}  = req.body
    let BlogId = await Blog.findById(req.params.id)
    await Commnet.create({
        comment,
        postedBy: req.user._id,
        OnBlog : BlogId._id 
    })
    res.redirect(`showBlogs/${req.params.id}`);
})
module.exports = router