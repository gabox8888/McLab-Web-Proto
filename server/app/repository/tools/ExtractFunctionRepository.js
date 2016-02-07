/**
* This module represents a repository for the collection User
* @module repository/tools/ExtractFunctionRepository
*/

var env = process.env.NODE_ENV || 'development';
var config = require ('../../../config/config')[env];

var logger = console;
var mongoose = require('mongoose');

var execFile = require('child_process').execFile;
var Q = require('q');

var ObjectId = require('mongoose').Types.ObjectId;


/**
 * Returns all users with pagination
* @param {Array} optional optional params for the query (offset, limit, status, userName, guideName etc)
* @returns {Entries}
 */
module.exports.refactorExtractFunction = function(file,fileName,selection,newName) {
    var child = execFile('/home/gabe/McGill/McLab-400/mclab-ide/support/refactor.sh', ['ExtractFunction',file, selection,newName], function(error, stdout, stderr){
    if (error) {
      throw error;
    }
    jsonOUT = JSON.parse(stdout)
    var linesArr = jsonOUT['modified'][fileName].split('\n');
    var newJSON = {
      output:linesArr
    };

    return newJSON});
}
