const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotesModel = new Schema({
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model('Votes', VotesModel);