var express = require('express');
var passport = require('passport');

require('./config/econsole').enhance({level: 'ALL', includeDate: true});

//logging config
var logger = console;

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var app = express();



//boostrap mongoDB schemas and models
require('./app/model/indexDocumental');

//initialize repositories if required
require('./app/repository/RepositoryFactory').init(app);

// express settings
require('./config/express')(app, config, passport);

// Bootstrap routes
require('./app/route')(app, passport);

//start app on mentioned port
app.listen(config.app.port);

logger.info('listening on port ' + config.app.port);
