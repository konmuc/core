const express = require('express');
const postsController = require('../controllers/postsController');
const configureAuthz = require('@konmuc/authz');
const authzConfig = require('../config/authz');

const postsRouter = express.Router();

const authzClient = configureAuthz.default(Object.assign(authzConfig, { role: async req => req.user.toObject().role }));

postsRouter.get('/', authzClient('users:view'), postsController.index);

postsRouter.get('/:postId', authzClient('users:view'), postsController.specificPostById);

postsRouter.post('/', authzClient('users:create'), postsController.createPost);

postsRouter.get('/username', authzClient('users:view'), postsController.postsOfSpecificUser);

postsRouter.delete('/:postId', authzClient('posts:delete'), postsController.hideSpecificPostById);

module.exports = postsRouter;