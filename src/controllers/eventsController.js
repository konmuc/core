const EventModel = require('../models/event');

const eventController = function(){}

eventController.index = function(req, res) {
    try{
        EventModel.find(
            {},
            function(err, events) {
                var eventMap = {};
                if(!err && (events.length > 0)) {
                    events.forEach(
                        function(event){
                            eventMap[event._id] = event;
                        }
                    );
                    res.status(200).send(eventMap);
                }
                else {
                    res.status(204).send();
                }
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: eventConroller.index');
    }
}

eventController.createEvent = function(req, res) {
    try{
        var event = new EventModel(
            {
                name: req.body.name,
                description: req.body.description,
                location: {
                    adress: req.body.location.adress,
                    room: req.body.location.room,
                    geolocation: {
                        lat: req.body.location.geolocation.lat,
                        lon: req.body.location.geolocation.lon
                    }
                },
                time: {
                    start: req.body.time.start,
                    end: req.body.time.end
                },
                notification: {
                    enabled: req.body.notification.enabled,
                    time: req.body.notification.time
                }
            }
        )

        event.save(
            function(err, post) {
                if(err) {
                    return res.status(500).send(
                        'ERROR: eventController.createEvent -' +
                        ' While event.save() ' + err)
                }
                return res.status(200).send(event)
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: eventController.createEvent' + err)
    }
}

eventController.specificEventById = function(req, res) {
    try {
        EventModel.findById(
            req.params.eventId,
            function(err, event){
                if(err) {
                    return res.status(404).send(
                        'ERROR: eventController.specificEventById -' +
                        ' While EventModel.findById() ' + err)
                }
                return res.status(200).send(event);
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: eventController.specificEventById ' + err);
    }
}

eventController.deleteSpecificEventById = function(req, res) {
    try {
        EventModel.findByIdAndRemove(
            req.params.eventId,
            function(err, event) {
                if(err) {
                    return res.status(404).send(
                        'ERROR: eventController.deleteSpecificEventById -' +
                        ' While EventModel.findByIdAndRemove() ' + err)
                }
                return res.status(200).send();
            }
        )
    }
    catch(err) {
        return res.status(500).send('ERROR: eventController.deleteSpecificEventById ' + err);
    }
}

eventController.updateSpecificEventById = function(req, res) {
    try {
        EventModel.findByIdAndUpdate(
            req.params.eventId,
            {
                name: req.body.name,
                description: req.body.description,
                location: {
                    adress: req.body.location.adress,
                    room: req.body.location.room,
                    geolocation: {
                        lat: req.body.location.geolocation.lat,
                        lon: req.body.location.geolocation.lon
                    }
                },
                time: {
                    start: req.body.time.start,
                    end: req.body.time.end
                },
                notification: {
                    enabled: req.body.notification.enabled,
                    time: req.body.notification.time
                }
            },
            function(err, event) {
                if(err) {
                    return res.status(500).send(
                        'ERROR: eventController.updateSpecificEventById -' +
                        ' While EventModel.findByIdAndUpdate() ' + err)
                }
                return res.status(200).send();
            }
        )
    }
    catch(err){
        return res.status(500).send('ERROR: eventController.updateSpecificEventById ' + err);
    }
}

module.exports = eventController;