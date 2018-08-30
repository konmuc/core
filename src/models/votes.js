const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotesModel = new Schema({
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
});

module.exports = mongoose.model('Votes', VotesModel);