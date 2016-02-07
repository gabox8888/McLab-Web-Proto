var logger = console;

module.exports = {
    resourceNotFound: {
        code: 134,
        error: "The requested resource was not found.",
        description: "The resource you are trying to interact with,  does not exist. Make sure you provided the right parameters."
    },
    notAvailable: function (detail) {
        var error =  {
            code: 125,
            error: "Internal Service not available"
        };

        if(typeof detail !== 'undefined'){
            error.detail = detail;
        }

        return error;
    },
    duplicateError: function (description, detail) {
        var error =  {
            code: 145,
            error: "Resource already exists",
            description: description
        };

        if(typeof detail !== 'undefined'){
            error.detail = detail;
        }

        return error;
    },
    databaseError: function (description, detail) {
        var error =  {
            code: 138,
            error: "Database error",
            description: description
        };

        if(typeof detail !== 'undefined'){
            error.detail = detail;
        }

        return error;
    },
    invalidParamError: function (description, detail) {
        var error =  {
            code: 116,
            error: "Invalid parameter error",
            description: description
        };

        if(typeof detail !== 'undefined'){
            error.detail = detail;
        }

        return error;
    },
    validationError: function (description, detail) {
        var error = {
            code: 400,
            error: "Validation failed",
            description: description
        };

        if (typeof detail !== 'undefined') {
            error.detail = detail;
        }

        return error;
    },
    invalidCategory: function (category) {
        var error =  {
            code: 148,
            error: 'Category with id '+category+' not found'
        };

        return error;
    },
    invalidModule: function (idModule) {
        var error =  {
            code: 128,
            error: 'Module with id '+ idModule +' not found'
        };

        return error;
    },
    notFoundError: function (detail) {
        var error =  {
            code: 168,
            error: "Resource not found",
            description: {
                message: "The requested resource was not found."
            }
        };

        if(typeof detail !== 'undefined'){
            error.detail = detail;
        }

        return error;
    },
    unknownError: function (description, detail) {
        var error =  {
            code: 121,
            error: "unknownError error",
            description: description
        };

        if(typeof detail !== 'undefined'){
            error.detail = detail;
        }

        return error;
    }
};