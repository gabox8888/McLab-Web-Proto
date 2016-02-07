
var path = require('path');
var rootPath = path.normalize(__dirname + '/..');


module.exports = {
  	development: {
  	 	loggerLevel: "debug",
  	 	root: rootPath,
  	 	tokenHeader: "Secure-Token",
  	 	mongo: {
  	 		host: "localhost",
  	 		port: "27017",
  	 		name: "McWebAPI",
  	 		user: "",
  	 		password: ""
  	 	},

		app: {
			name: 'McWebAPI',
			host: 'localhost',
			port: 8282,
			inversePort: 8282,
			tokenExpiration: 3600000*2
		},
    security: {
        tokenLife : 3600
    }
	},
	qa: {
  	 	loggerLevel: "info",
  	 	root: rootPath,
  	 	tokenHeader: "Secure-Token",
  	 	mongo: {
  	 		host: "localhost",
  	 		port: "27017",
  	 		name: "McWebAPI",
  	 		user: "",
  	 		password: ""
  	 	},

		app: {
			name: 'McWebAPI',
			host: '',
			port: 9090,
			inversePort: 80,
			tokenExpiration: 3600000*2
		},
    security: {
        tokenLife : 3600
    }
	},
	production: {
		loggerLevel: "info",
		root: rootPath,
		tokenHeader: "Secure-Token",
	mongo: {
		host: "localhost",
		port: "27017",
		name: "McWebAPI",
		user: "",
		password: ""
	},
		app: {
			name: 'McWebAPI',
			host: 'localhost',
			port: 6543,
			inversePort: 80,
			tokenExpiration: 3600000*2
		}
	}
};

module.exports.qa.loggerLevel = 'debug';
module.exports.production.loggerLevel = 'debug';

module.exports.development.businessEventHeader = 'business-event';
module.exports.qa.businessEventHeader = 'business-event';
module.exports.production.businessEventHeader = 'business-event';

module.exports.development.userHeader = 'mcweb-user';
module.exports.qa.userHeader = 'mcweb-user';
module.exports.production.userHeader = 'mcweb-user';

module.exports.development.countHeader = 'mcweb-count';
module.exports.qa.countHeader = 'mcweb-count';
module.exports.production.countHeader = 'mcweb-count';
