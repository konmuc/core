const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventModel = new Schema({
    eventId: String,
    name: String,
    description: String,
    location: {
        adress: String,
        room: String,
        geolocation: {
            lat: String,
            lon: String
        }
    },
    time: {
        start: Number,
        end: Number
    },
    notification: {
        enabled: Boolean,
        time: Number
    }
});

module.exports = mongoose.model('Event', EventModel);