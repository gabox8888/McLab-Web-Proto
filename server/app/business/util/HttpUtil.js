'use strict';

var logger = console;

var http = require("http");

var Q = require("q");

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/config')[env];

var ErrorUtil = require('./ErrorUtil');

module.exports = {

    formatHeaders: function (headers) {
        if (typeof headers != 'undefined' && headers != null) {
            delete headers['content-length'];
        }

        return headers;
    },
    makePromisedRequest: function (options, optional) {

        var deferred = Q.defer();

        var result = {};

        var serviceRequest = http.request(options, function (serviceResponse) {

            serviceResponse.setEncoding('utf8');

            var responseBody = '';

            serviceResponse.on('data', function (resB) {
                responseBody += resB;
            });

            serviceResponse.on('end', function () {

                try {
                    //format response
                    var formattedResponse = responseBody;
                    if (responseBody.length > 0) {
                        formattedResponse = JSON.parse(formattedResponse.toString());
                    }

                    result.headers = serviceResponse.headers;
                    result.statusCode = serviceResponse.statusCode;
                    result.response = formattedResponse;

                    deferred.resolve(result);
                } catch (error) {
                    result.headers = serviceResponse.headers;
                    result.statusCode = serviceResponse.statusCode;
                    result.response = null;

                    deferred.resolve(result);
                }

            });
        });

        serviceRequest.on('error', function (e) {
            logger.trace(e);
            deferred.reject(ErrorUtil.notAvailable(e));
        });


        var bodyWritten = false;

        if (typeof optional !== 'undefined') {
            if (typeof optional.body !== 'undefined') {
                bodyWritten = true;
                serviceRequest.write(JSON.stringify(optional.body));
            }
        }

        if (!bodyWritten && options.method !== 'GET') {
            serviceRequest.write(JSON.stringify({}));
        }

        serviceRequest.end();

        return deferred.promise;

    },

    makeDefaultRequest: function (req, res, options, optional) {

        //logger.debug("------------- From: " + req.method + " +++++++++++ " + 'Path :' + options.path);

        options.agent = false;

        options.headers = module.exports.formatHeaders(options.headers);

        var serviceRequest = http.request(options, function (serviceResponse) {

            serviceResponse.setEncoding('utf8');

            var responseBody = '';

            serviceResponse.on('data', function (resB) {
                responseBody += resB;
            });

            serviceResponse.on('error', function (e) {
                logger.error(e);
                res.status(500).json(ErrorUtil.notAvailable());
            });

            serviceResponse.on('end', function () {

                //format response
                var formattedResponse = responseBody;

                if (responseBody.length > 0) {
                    formattedResponse = JSON.parse(formattedResponse.toString());
                }

                res.set(serviceResponse.headers);

                //logger.info('+++ Response code:' + serviceResponse.statusCode);


                //return response and status
                res.status(serviceResponse.statusCode).json(formattedResponse);

            });
        });

        serviceRequest.on('error', function (e) {
            logger.trace(e);
            res.status(500).json(ErrorUtil.notAvailable());
        });


        var bodyWritten = false;

        if (typeof optional !== 'undefined') {
            if (typeof optional.body !== 'undefined') {
                bodyWritten = true;
                var bodySent = JSON.stringify(optional.body);
                serviceRequest.write(bodySent);
            }
        }

        if (!bodyWritten && options.method !== 'GET') {
            serviceRequest.write(JSON.stringify({}));
        }

        serviceRequest.end();

    }
};