const express = require('express');
const postsController = require('../controllers/postsController');
const configureAuthz = require('@konmuc/authz');
const authzConfig = require('../config/authz');

const postsRouter = express.Router();

const authzClient = configureAuthz.default(Object.assign(authzConfig, { role: async req => req.user.toObject().role }));

//Get list of all posts
postsRouter.get('/', authzClient('users:view'), postsController.index);

//Get specific post
postsRouter.get('/:postId', authzClient('users:view'), postsController.specificPostById);

//Get list of all posts of user
postsRouter.get('/of/:username', authzClient('users:view'), postsController.postsOfSpecificUser);

//Create post
postsRouter.post('/', authzClient('users:create', async(req) => {req.params.username = req.user.username; return req; }), postsController.createPost);

//Delte post
postsRouter.delete('/:postId', authzClient('posts:delete'), postsController.hideSpecificPostById);

module.exports = postsRouter;