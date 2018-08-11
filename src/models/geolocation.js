const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeolocationModel = new Schema({
    lat: Number,
    lon: Number
});

module.exports = mongoose.model('Geolocation', GeolocationModel);