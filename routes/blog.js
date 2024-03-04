const express = require('express');
const router = express.Router();
const {jwtMiddleware} = require('../middlewares/auth');
const {addBlogGet,addBlogPost} = require('../controllers/blog/addBlog')
const {showBlogGet , showBlogWithId} = require('../controllers/blog/showBlogs')
const {commentLikePost,commentPost} = require('../controllers/comment/commentLikePostmethod')
// post method to save blog data in databse
router.get('/addBlog',jwtMiddleware,addBlogGet)
router.post('/addBlog',jwtMiddleware,addBlogPost) 
//blogs view
router.get('/showBlog',jwtMiddleware,showBlogGet)
//Blogs to view on a seprate page
router.get('/showBlogs/:id',jwtMiddleware, showBlogWithId)
// comments likes
router.post("/comment/:commentId", jwtMiddleware,commentLikePost);
//Comment Route
router.post("/:id",jwtMiddleware, commentPost)
module.exports = router