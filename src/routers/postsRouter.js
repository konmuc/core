const express = require('express');
const postsController = require('../controllers/postsController');
const configureAuthz = require('@konmuc/authz');
const authzConfig = require('../config/authz');

const User = require('@konmuc/authc/models/User').default;

const postsRouter = express.Router();

const authzClient = configureAuthz.default(Object.assign(authzConfig, { role: async req => req.user.toObject().role }));

postsRouter.get('/', authzClient('users/posts:view'), postsController.index);

postsRouter.get('/:postId', authzClient('users/posts:view'), postsController.specificPostById);

postsRouter.post('/', authzClient('users:create',
    async (req) => {
        req.params = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.createPost);

postsRouter.get('/:username', authzClient('users/posts:view'), postsController.postsOfSpecificUser);

postsRouter.delete('/:postId', authzClient('posts:delete',
    async (req) => {
        req.params = await User.findOne({ username: req.user.username });
        return req
    }),    
    postsController.hideSpecificPostById);

module.exports = postsRouter;