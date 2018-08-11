const express = require('express');
const userContoller = require('../controllers/userController');
const configureAuthz = require('@konmuc/authz');
const authzConfig = require('../config/authz');

const usersRouter = express.Router();

const authzClient = configureAuthz.default(Object.assign(authzConfig, { role: async req => req.user.toObject().role }));

usersRouter.get('/', authzClient('users:view'), userContoller.index);

usersRouter.get('/:username', authzClient('users:view'), userContoller.specificUserDetails);

usersRouter.patch('/:username', authzClient('users:edit'), userContoller.patchUserDetails);

usersRouter.post('/:username', authzClient('users:create'), userContoller.createUserDetails);

module.exports = usersRouter;