/**
* This module represents a set of business methods
* @module business/tools/McLint
*/

var logger = console;
var repositoryFactory = require('../../repository/RepositoryFactory').getRepositoryFactory();

// Load configurations according to the selected environment
var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config')[env];


var ErrorUtil = require('../util/ErrorUtil');

var mongoose = require('mongoose');
var SchemaType = mongoose.SchemaType;
var CastError = SchemaType.CastError;

var ValidationError = mongoose.Error.ValidationError;
var ValidatorError = mongoose.Error.ValidatorError;

var extend = require('util')._extend;

var Q = require('q');
var path = require('path');

var extractFunctionRepository = repositoryFactory.getExtractFunctionRepository();
var createFileRepository = repositoryFactory.getCreateFileRepository();


module.exports.runExtractFunction = function(req, res){

	var selection = req.body.selection;
	var newName = req.body.newName;
	var code = req.body.code;
	var fileName = req.body.fileName;

	var promise = createFileRepository.createFile(fileName,code);

	promise.then(function (filePath) {
		return extractFunctionRepository.refactorExtractFunction(filePath,fileName,selection,newName);
	}).then(function(newCode)){
		return res.status(200).json(newCode);
	}).then(null, function (error) {

      logger.trace(error);

      if (error.code === 11000 || error.code === 11001) {
          return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
      }

      if (error instanceof  CastError) {
          return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter user', error));
      }

      if (error instanceof  ValidationError || error instanceof ValidatorError) {
          return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
      }

      res.status(500).json(ErrorUtil.unknownError(error));

  });

};
