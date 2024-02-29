const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    OnBlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
