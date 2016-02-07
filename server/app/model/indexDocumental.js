var mongoose = require('mongoose');
var logger = console;

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];

//setup mongoDB connection

var connectionString = 'mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.name+'';

if(config.mongo.user.length > 0 && config.mongo.password.length > 0){
	connectionString = 'mongodb://'+config.mongo.user+':'+config.mongo.password+'@'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.name+'';
}

mongoose.connect(connectionString, function (err, res) {
    if (err) throw err;
    logger.debug('Successful connection to MongoDB');
});

mongoose.set('debug', false);
