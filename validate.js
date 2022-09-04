const { FilesManager } = require('turbodepot-node');
let filesManager = new FilesManager();

let equal = filesManager.isFileEqualTo('output.txt', 'A2.output.test1.txt');

console.log(`Answer matches solution: ${equal}`);
