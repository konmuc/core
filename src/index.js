const console = require('console');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');
require('dotenv').config();

const authc = require('@konmuc/authc');
const authcRouter = require('@konmuc/authc/router');

// Setup Mongoos to the local MongoDB instance
mongoose.connect(
    process.env.MONGO_HOST
);
mongoose.Promise = global.Promise;
mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error: ')
);


// Setup Express instance with some extra properties
const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function(req, res, next) {
    res.header(
        'Access-Control-Allow-Origin',
        '*'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header(
        'Access-Control-Allow-Credentials',
        true
    );
    next();
});

// authc stuff
app.use('/auth', authcRouter.default);
app.use(authc.default({
    accessTokenExpiration: { minutes: process.env.AUTHC_EXPIRATIONTIME_MIN },
    secret: process.env.AUTHC_SECRET
}));

// API Routes
app.use('/v1/users', require('./routers/usersRouter'));
app.use('/v1/posts', require('./routers/postsRouter'));
app.use('/v1/events', require('./routers/eventsRouter'));
app.use('/', require('./routers/index'));

// Error handler, which outputs JSON to the client.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    let { status = 500, message } = err;

    console.error(err);

    if (status === 500) message = 'An internal server error occured.';
    res.status(status).send({ status, message });
});

const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATEKEY),
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    ca: fs.readFileSync(process.env.SSL_CA),
    secureProtocol: "TLSv1_2_method"
}

const httpsServer = https.createServer(options, app);
httpsServer.listen(process.env.HTTPS_PORT, () => {
        console.log('HTTPS Server running on port ' + process.env.HTTPS_PORT);
});