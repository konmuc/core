const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostModel = new Schema({
    username: String,
    content: {
        text: String,
        metadata: {
            date: Number,
            image: String,
            geolocation: {
                lat: String,
                lon: String
            }
        }
    },
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
    },
    comments: [ {
            content: {
                text: String,
                metadata: {
                    date: Number,
                    image: String,
                    geolocation: {
                        lat: String,
                        lon: String
                    }
                }
            },
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
        }
    ],
    isHidden: Boolean
});

module.exports = mongoose.model('Post', PostModel);