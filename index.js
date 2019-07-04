/**
 * @file merge-files
 * @author Sheeta(wuhayao@gmail.com)
 */

var fs = require('fs');
var multistream = require('multistream');

/**
 * merge files
 *
 * @param  {Array<string>} inputPathList      input path list
 * @param  {string}        outputPath         output path
 * @return {promise}       promise
 */
module.exports = function mergeFiles(inputPathList, outputPath) {
    var fd = fs.openSync(outputPath, 'w+');
    var output = fs.createWriteStream(outputPath);
    var inputList = inputPathList.map((path) => {
        return fs.createReadStream(path);
    });
    return new Promise((resolve, reject) => {
        var multiStream = multistream(inputList);
        multiStream.pipe(output);
        multiStream.on('end', () => {
            fs.closeSync(fd);
            resolve(true);
        });
        multiStream.on('error', () => {
            fs.closeSync(fd);
            reject(false);
        });
    });
}
