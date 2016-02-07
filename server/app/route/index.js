var tools = require("./tools.js");

var logger = console;
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];


//var apiDocBusiness = require('../business/api-doc/APIDocBusiness');


/**
 * Main function to bootstrap all routes of this app
 * @param app the express app
 * @param passport the passport object for auth
 */
module.exports = function (app, passport) {

      app.use(passport.initialize());

      //require('../business/util/PassportUtil');

      app.all('*', function(req, res, next) {
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
          res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, "+config.tokenHeader+", "+config.businessEventHeader+", "+config.userHeader+", "+config.countHeader);
          res.header("Access-Control-Expose-Headers", "X-Requested-With, Content-Type, "+config.tokenHeader+", "+config.businessEventHeader+", "+config.userHeader+", "+config.countHeader);

          if (req.method === 'OPTIONS') {
              res.send (204);
          }else{
              next();
          }

      });

        tools(app, passport);

  //routes for the api-doc
//  app.get('/api-docs', apiDocBusiness.apiDoc);


}
