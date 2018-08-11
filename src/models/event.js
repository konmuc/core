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
            type: Schema.Types.ObjectId, ref: 'Geolocation'
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