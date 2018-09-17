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
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.createPost);

postsRouter.get('/:username', authzClient('users/posts:view'), postsController.postsOfSpecificUser);

postsRouter.delete('/:postId', authzClient('posts:delete',
    async (req) => {
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),    
    postsController.hideSpecificPostById
);

postsRouter.get(
    '/:postId/upvote',
    authzClient('users/posts:view',
    async (req) => {
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.postUpVote
);

postsRouter.get(
    '/:postId/downvote',
    authzClient('users/posts:view',
    async (req) => {
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.postDownVote
);

postsRouter.post(
    '/:postId/',
    authzClient('users/posts:view',
    async (req) => {
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.addComment
);

postsRouter.get(
    '/:postId/:commentId/upvote',
    authzClient('users/posts:view',
    async (req) => {
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.commentUpVote
);

postsRouter.get(
    '/:postId/:commentId/downvote',
    authzClient('users/posts:view',
    async (req) => {
        req.params.user = await User.findOne({ username: req.user.username });
        return req
    }),
    postsController.commentDownVote
);

module.exports = postsRouter;