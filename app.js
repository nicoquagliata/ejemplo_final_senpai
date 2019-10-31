const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const multipart = require('connect-multiparty');


const routes = require('./routes/routes');


const app = express();

let corsOptions = {
    methods: 'TET, PUT, POST, DELETE, OPTIONS',
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'access_token', 'ACCESS_TOWKEN'],
    exposedHeaders: ['Content-Type', 'Authorization', 'access_token', 'ACCESS_TOWKEN']

}

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(multipart());
app.use(express.static(__dirname + "/public"));

app.use('/api/v1', routes);

module.exports = app;