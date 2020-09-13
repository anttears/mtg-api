const https = require('https');
const fs = require('fs');
require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const expressSession = require('express-session')({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
});

const publicRouter = require('./routes/public');
const secureRouter = require('./routes/secure');
const apiRouter = require('./routes/api');

const app = express();

app.use(express.json({limit: '300kb'}));
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileupload());
app.use(xss());
app.use(mongoSanitize());
app.use(helmet());
const limit = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests'
});

app.use('/', publicRouter);
app.use('/secure', limit, secureRouter);
app.use('/api', limit, apiRouter);

app.use('/js', express.static(path.join(__dirname, '../client/js')));
app.use('/css', express.static(path.join(__dirname, '../client/css')));

const mongoDB = process.env.mongoDB;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', console.error.bind(console, 'Database connection error: '));

https.createServer({
    key: fs.readFileSync(path.join(__dirname, './key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './cert.pem'))
}, app).listen(9191);
