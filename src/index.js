const console = require('console');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authc = require('@konmuc/authc');
const authcRouter = require('@konmuc/authc/router');


// TODO
// Move config out of here
// Maybe also the routes ?!
const port = 8088;
const ip = "127.0.0.1";

// Setup Mongoos to the local MongoDB instance
mongoose.connect('mongodb://localhost/kongeos');
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));


// Setup Express instance with some extra properties
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Credentials', true);

    next();
  });

// authc stuff
app.use('/auth', authcRouter.default);
app.use(authc.default({ secret: '359D15ED4F861385A2A32A5AB3D7A1FACD2D11F057BF722204EE2043F05F6EA7' }));

// API Routes
app.use('/v1/users', require('./routers/usersRouter'));
app.use('/v1/posts', require('./routers/postsRouter'));
app.use('/', require('./routers/index'));

// Error handler, which outputs JSON to the client.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    let { status = 500, message } = err;

    console.error(err);

    if (status === 500) message = 'An internal server error occured.';
    res.status(status).send({ status, message });
});

app.listen(port, ip, function() {
    console.log('Express server listening on %d', port);
});