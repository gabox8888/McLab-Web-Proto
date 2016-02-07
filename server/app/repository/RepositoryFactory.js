/**
	 * A factory module for repositories
	 * @module repository/RepositoryFactory
	 */

	var logger = console;
	var appReference = null;

	/**
	 * Initializes the repository factory passing the express app as dependency
	 * @param {Express} app - The express app
	 */
	module.exports.init = function(app) {
	    appReference = app;
	};

	/**
	 * Returns the repository factory object with the appropiate methods
	 * for each repository
	 * @returns {object} a repositoryFactory object
	 */
	module.exports.getRepositoryFactory = function() {
		var repositoryFactory = {
			/**
			 * Creates a new TourRepository module. It corresponds to
			 * the document Tour
			 * @returns {TourRepository} a TourRepository module
			 */
			getExtractFunctionRepository: function(){
				return require("./tools/ExtractFunctionRepository");
			},
			getCreateFileRepository: function(){
				return require("./tools/CreateFileRepository");
			}
		};

		return repositoryFactory;
	};
