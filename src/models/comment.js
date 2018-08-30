const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 
 */
const CommentModel = new Schema({
    text: String,
    date: Number,
    username: String,
    votes: {
        upvotes: [
            {
                userId: String
            }
        ],
        downvotes: [
            {
                userId: String
            }
        ]
    }
});

module.exports = mongoose.model('Comment', CommentModel);