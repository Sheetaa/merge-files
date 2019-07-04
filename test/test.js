var test = require('ava');
var mergeFiles = require('../index');
var areFilesEqual = require('fs-equal').areFilesEqual;

const PREFIX = __dirname + '/files/';

test(function (t) {

    var outputPath = PREFIX + 'output.txt';
    var targetPath = PREFIX + 'target.txt';
    var inputPathList = [1, 2, 3].map(function (value) {
        return PREFIX + value + '.txt';
    });

    return mergeFiles(inputPathList, outputPath).then(function (status) {
        if (!status) {
            return Promise.reject('merge files error');
        }
        else {
            return areFilesEqual(outputPath, targetPath);
        }
    }).then(function (equal) {
        if (equal) {
            t.pass();
        }
        else {
            return Promise.reject('output and target are not equal');
        }
    }).catch(function (error) {
        t.fail(error);
    });
});
