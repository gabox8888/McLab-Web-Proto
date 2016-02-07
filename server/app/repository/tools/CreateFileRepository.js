/**
* This module represents a repository for the collection User
* @module repository/tools/CreateFileRepository
*/

var env = process.env.NODE_ENV || 'development';
var config = require ('../../../config/config')[env];

var logger = console;
var mongoose = require('mongoose');

var execFile = require('child_process').execFile;
var fs = require('fs');
var Q = require('q');

var ObjectId = require('mongoose').Types.ObjectId;


/**
 * Returns all users with pagination
* @param {Array} optional optional params for the query (offset, limit, status, userName, guideName etc)
* @returns {Entries}
 */
module.exports.createFile = function(fileName,data) {

  fs.writeFile('./public/tempFiles'+ fileName, date , function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
    return './public/tempFiles'+ fileName;
  });
}
