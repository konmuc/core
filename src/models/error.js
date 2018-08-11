const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ErrorModel = new Schema({
    code: Number,
    message: String,
    stacktrace: Array
});

module.exports = mongoose.model('Error', ErrorModel);