const express = require('express');
const eventsController = require('../controllers/eventsController');
const configureAuthz = require('@konmuc/authz');
const authzConfig = require('../config/authz');

const eventsRouter = express.Router();

const authzClient = configureAuthz.default(Object.assign(authzConfig, { role: async req => req.user.toObject().role }));

eventsRouter.get('/', authzClient('users:view'), eventsController.index);

eventsRouter.post('/', authzClient('events:create'), eventsController.createEvent);

eventsRouter.get('/:eventId', authzClient('users:view'), eventsController.specificEventById);

eventsRouter.get('/:eventId', authzClient('events:edit'), eventsController.updateSpecificEventById);

eventsRouter.delete('/:eventId', authzClient('events:delete'), eventsController.deleteSpecificEventById);

module.exports = eventsRouter;