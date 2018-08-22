const express = require('express');
const userContoller = require('../controllers/userController');
const configureAuthz = require('@konmuc/authz');
const authzConfig = require('../config/authz');

const User = require('@konmuc/authc/models/User').default;

const usersRouter = express.Router();

const authzClient = configureAuthz.default(Object.assign(authzConfig, { role: async req => req.user.toObject().role }));

// Returns list of all users
usersRouter.get('/', authzClient('users:view'), userContoller.index);

// Returns specific user
usersRouter.get('/:username', authzClient('users:view'), userContoller.specificUserDetails);

// Patches userdetails
usersRouter.patch('/:username', authzClient('users:edit'), userContoller.patchUserDetails);

// First creation of userdetails
usersRouter.post('/:username', authzClient('users:create'), userContoller.createUserDetails);

module.exports = usersRouter;