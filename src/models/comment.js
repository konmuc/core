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
        type: Schema.Types.ObjectId, ref: 'Votes'
    }
});

module.exports = mongoose.model('Comment', CommentModel);