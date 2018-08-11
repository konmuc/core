const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: String,
    gender: String,
    firstname: String,
    lastname: String,
    email: String,
    profilePicture: String,
    motto: String,
    university: String,
    cityExcursion: String,
    professionalExcursion: String,
    role: String,
    isBanned: Boolean
});

module.exports = mongoose.model('UserDetail', UserModel);