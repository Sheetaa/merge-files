/**
 * @file merge-files
 * @author Sheeta(wuhayao@gmail.com)
 */

const fs = require('fs');
const multistream = require('multistream');

/**
 * merge files
 * 
 * @param  {Array<string>} inputPathList      input path list
 * @param  {string}        outputPath         output path
 * @return {promise}       promise
 */
module.exports = function mergeFiles(inputPathList: Array, outputPath: string) {
    const output = fs.createWriteStream(outputPath);
    const inputList = inputPathList.map((path) => {
        return fs.createReadStream(path);
    });
    return new Promise((resolve, reject) => {
        const multiStream = multistream(inputList);
        multiStream.pipe(output);
        multiStream.on('end', () => {
            resolve();
        });
        multiStream.on('error', () => {
            reject();
        });
    });
}
