const Commnet = require('../../models/comment')
const Blog = require('../../models/blog')
const commentLikePost = async (req, res) => {
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
}
const commentPost = async(req,res)=>{
    let {comment}  = req.body
    let BlogId = await Blog.findById(req.params.id)
    await Commnet.create({
        comment,
        postedBy: req.user._id,
        OnBlog : BlogId._id 
    })
    res.redirect(`showBlogs/${req.params.id}`);
}
module.exports = {
    commentLikePost,
    commentPost
}