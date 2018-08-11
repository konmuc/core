const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostModel = new Schema({
    postId: Number,
    username: String,
    content: {
        text: String,
        metadata: {
            date: Number,
            image: String,
            geolocation: {
                type: Schema.Types.ObjectId, ref: 'Geolocation'
            }
        }
    },
    votes: {
        type: Schema.Types.ObjectId, ref: 'Votes'
    },
    comments: [{
        type: Schema.Types.ObjectId, ref: 'Comment'
    }],
    isHidden: Boolean
});

module.exports = mongoose.model('Post', PostModel);