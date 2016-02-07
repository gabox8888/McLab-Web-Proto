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



/**
 * Returns all tour items with pagination. Results can be refined with optional parameters
* @param {integer} offset -HTTP Type: QUERY- the index where the records start from
* @param {integer} limit -HTTP Type: QUERY- the limit of records to retrieve
* @param {string} orderBy -HTTP Type: QUERY- the order field
* @param {string} orderType -HTTP Type: QUERY- the order type field
* @param {string} name -HTTP Type: QUERY- the name of the tour to be retrieved
* @returns {TourDto}
 */
module.exports.getAllTours = function(req, res){
	var limit = req.query.limit;
	var offset = req.query.offset;
	var orderBy = req.query.orderBy;
	var orderType = req.query.orderType;
	var name = req.query.name;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_getAllTours_body) ENABLED START */
    var promise = tourRepository.getAllTours(req.query);

    promise.then(function (tours) {
        if (typeof tours != 'undefined' && tours != null) {
            res.header(config.countHeader, tours.count);
            return res.status(200).json(TourDto.buildList(tours.list));
        } else {
            return res.status(404).json(ErrorUtil.notFoundError('Tours not found'));
        }
    }).then(null, function (error) {

        logger.trace(error);

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));
    });
    /* PROTECTED REGION END */
};


/**
 * Creates a new tour
* @param {TourInputDto} tour -HTTP Type: BODY- the tour to be created
* @returns {TourDto}
 */
module.exports.createTour = function(req, res){
	var body = req.body;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_createTour_body) ENABLED START */
    var promise = tourRepository.createTour(body);

    promise.then(function (tourCreated) {
        res.status(200).json(TourDto.build(tourCreated));
    }).then(null, function (error) {

        logger.trace(error);

        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
        }

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });

    /* PROTECTED REGION END */
};

/**
 * Creates a new tour
* @param {TourInputDto} tour -HTTP Type: BODY- the tour to be created
* @returns {TourDto}
 */
module.exports.pickTour = function(req, res){
	var id = req.params.id;
	var authStr = req.headers['authorization']
	var authArr = authStr.split("\"");
	var token = authArr[1];

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_createTour_body) ENABLED START */
		var tourObj;
		var tourDownloadedObj;
		var tourReviewObj;
		var userObj
    var promise = tourRepository.getTourById(id);

    promise.then(function (tourPicked) {
			tourObj = tourPicked;
			return accessTokenRepository.getAccessTokenByToken(token);
		}).then(function(accessToken) {
			userObj = accessToken._user;
			return tourDownloadedRepository.getTourDownloadedByOwnerIDAndTourID(userObj._id,tourObj._id);
		}).then(function(tourDownloaded){
			tourDownloadedObj = tourDownloaded;
			res.status(200).json(TourPickDto.build(tourRetrieved,tourDownloadedObj,null));
    }).then(null, function (error) {

        logger.trace(error);

        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
        }

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });

    /* PROTECTED REGION END */
};


/**
 * Retrieves a tour by id
* @param {string} id -HTTP Type: NAMED- the _id of the tour to retrieve
* @returns {TourDto}
 */
module.exports.getTourById = function(req, res){
	var id = req.params.id;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_getTourById_body) ENABLED START */
    var promise = tourRepository.getTourByID(id);

    promise.then(function (tourRetrieved) {
        res.status(200).json(TourDto.build(tourRetrieved));
    }).then(null, function (error) {

        logger.trace(error);

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });
    /* PROTECTED REGION END */
};

/**
 * Retrieves a tour by owner id
* @param {string} id -HTTP Type: NAMED- the _id of the tour to retrieve
* @returns {TourDto}
 */
module.exports.getTourByOwnerID = function(req, res){
	var id = req.params.id;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_getTourById_body) ENABLED START */
    var promise = tourRepository.getTourByOwnerID(id);

    promise.then(function (tours) {
			if (typeof tours != 'undefined' && tours != null) {
					res.header(config.countHeader, tours.count);
					return res.status(200).json(TourDto.buildList(tours.list));
			} else {
					return res.status(404).json(ErrorUtil.notFoundError('Tours not found'));
			}
		}).then(null, function (error) {

        logger.trace(error);

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });
    /* PROTECTED REGION END */
};

/**
 * Retrieves a tour by user id/ self
* @param {string} id -HTTP Type: NAMED- the _id of the tour to retrieve
* @returns {TourDto}
 */
module.exports.getToursSelf = function(req, res){

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_getTourById_body) ENABLED START */
    var promise = accessTokenRepository.getAccessTokenByToken(token);

    promise.then(function (accessToken) {
			return tourRepository.getTourByOwnerID(accessToken._user);
		}).then(function (tours){
			if (typeof tours != 'undefined' && tours != null) {
					res.header(config.countHeader, tours.count);
					return res.status(200).json(TourDto.buildList(tours.list));
			} else {
					return res.status(404).json(ErrorUtil.notFoundError('Tours not found'));
			}
    }).then(null, function (error) {

        logger.trace(error);

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });
    /* PROTECTED REGION END */
};

/**
 * Retrieves a tour by distance
* @param {string} id -HTTP Type: NAMED- the location of the user
* @returns {TourDto}
 */
module.exports.getTourNearby = function(req, res){
	var centerCoords = [];
	centerCoords[0] = parseFloat(req.query.latitude) || 0;
	centerCoords[1] = parseFloat(req.query.longitude) || 0;
	var distance = req.query.distance;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_getTourById_body) ENABLED START */
    var promise = tourRepository.getTourNearby(centerCoords,distance);

    promise.then(function (tourRetrieved) {
			if (typeof tourRetrieved != 'undefined' && tourRetrieved != null) {
					return res.status(200).json(TourDto.buildList(tourRetrieved));
			} else {
					return res.status(404).json(ErrorUtil.notFoundError('Tours not found'));
			}
    }).then(null, function (error) {

        logger.trace(error);

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });
    /* PROTECTED REGION END */
};

/**
 * Updates a tour
* @param {string} id -HTTP Type: NAMED- the _id of the tour to update
* @param {TourInputDto} tour -HTTP Type: BODY- the tour to update
* @returns {TourDto}
 */
module.exports.updateTour = function(req, res){
	var tourID = req.params.id;
	var body = req.body;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_updateTour_body) ENABLED START */
    var promise = tourRepository.updateTour(body);

    promise.then(function (tourUpdated) {
        res.status(200).json(TourDto.build(tourUpdated));
    }).then(null, function (error) {

        logger.trace(error);

        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
        }

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });
    /* PROTECTED REGION END */
};

/**
 * Import Tour from old DB to new one
* @param {string} id -HTTP Type: NAMED- the _id of the user to update
* @param {UserInputDto} user -HTTP Type: BODY- the user to update
* @returns {UserDto}
 */
module.exports.importTour = function(req, res){

	/* PROTECTED REGION ID(WANDER_API.com.wander_user_Business_UserBusiness_updateUser_body) ENABLED START */
		var body = req.body;
		var userID = body.owner._id;

		var userPromise = userRepository.getUserById(userID);

		userPromise.then(function (user){
			console.log(user);
			return tourRepository.importTour(body,user);
		}).then(function (newTour) {
			var cityPromise = cityRepository.getCityByCity(newTour.location.city);
			cityPromise.then(function (city){
				if (city !== null) return cityRepository.incrementToursCreatedCount(city.city);
				else {
					var cityObj ={
						city: newTour.location.city,
						country : newTour.location.countryCode
					};
					var createCityPromise = cityRepository.createCity(cityObj)
					createCityPromise.then(function (newCity){
						cityRepository.incrementUserCount(newCity.city);
					});
				}
			});

			var countryPromise = countryRepository.getCountryByCountry(newTour.location.countryCode);
			countryPromise.then(function (country){
				if (country !== null) return countryRepository.incrementToursCreatedCount(country.country);
				else {
					var countryObj ={
						country : newTour.location.countryCode
					};
					var createCountryPromise = countryRepository.createCountry(countryObj)
					createCountryPromise.then(function (newCountry){
						console.log(newCountry);
						countryRepository.incrementUserCount(newCountry.country);
					});
				}
			});
      res.status(200).json(TourDto.build(newTour));
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
    /* PROTECTED REGION END */
};

/**
 * Updates a tour
* @param {string} id -HTTP Type: NAMED- the _id of the tour to update
* @param {TourInputDto} tour -HTTP Type: BODY- the tour to update
* @returns {TourDto}
 */
module.exports.deleteTour = function(req, res){
	var tourId = req.params.id;

	/* PROTECTED REGION ID(WANDER_API.com.wander_tour_Business_TourBusiness_deleteTour_body) ENABLED START */
    var promise = tourReviewRepository.deleteAllTourReviewsByTourId(tourId);

    promise.then(function () {
			return tourDownloadedRepository.deleteAllTourDownloadedByTourId(tourId);
		}).then(function(){
			return tourViewRepository.deleteAllTourViewsByTourId(tourid);
		}).then(function(){
			return tourRepository.deleteTour(tourId);
		}).then(function(tourDeleted){
        res.status(200).json(TourDto.build(tourUpdated));
    }).then(null, function (error) {

        logger.trace(error);

        if (error.code === 11000 || error.code === 11001) {
            return res.status(409).json(ErrorUtil.duplicateError(error.err, error));
        }

        if (error instanceof  CastError) {
            return res.status(404).json(ErrorUtil.invalidParamError('Invalid parameter tour', error));
        }

        if (error instanceof  ValidationError || error instanceof ValidatorError) {
            return res.status(400).json(ErrorUtil.validationError('Validation failed', error));
        }

        res.status(500).json(ErrorUtil.unknownError(error));

    });
    /* PROTECTED REGION END */
};
