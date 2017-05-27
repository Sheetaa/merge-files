# merge-files

Combine multiple files into one file in order based on [multistream](https://www.npmjs.com/package/multistream). It's a promise version that applies to merging large files that taking long time.

## Install

```shell
npm i merge-files
```

## Usage

```javascript
import mergeFiles from 'merge-files';

const outputPath = __dirname + '/result.txt';

const inputPathList = [
    __dirname + '/1.txt',
    __dirname + '/2.txt',
    __dirname + '/3.txt'
];

// status: true or false
const status = await mergeFiles(inputPathList, outputPath);
// or
mergeFiles(inputPathList, outputPath).then((status) => {
    // next
});
```
