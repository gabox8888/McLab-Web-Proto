/**
 * The module representing the tour routes module
 * @module route/tools
 */

var extractFunctionBusiness = require("../business/tools/ExtractFunctionBusiness");


/**
 * Following are the routes for tour
 * @param {Express} app the app element from express
 */
module.exports = function (app, passport) {


	/**
	 * Routes for the context tours with basePath "/v1/wanderAPI/tours".
	 * Description: Operations about tours
	 */


	app.post('/prototype/extract', extractFunctionBusiness.runExtractFunction);

};
