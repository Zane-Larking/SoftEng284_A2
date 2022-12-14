//Use by running the following command
//node readStdin.js Q4.js A2.input.test1.txt


startTime = new Date();

// input libraries
const fs = require('fs');
const args = require('process').argv.slice(2);
const child_process = require('child_process');

// get command line arguments
let childName = args[0] ? args[0] : 'childScript.js';
let textFile = args[1];

// create sub process
const child = child_process.spawn('node', [childName]);

//create streams
const fileStream = fs.createReadStream(textFile);
const output = fs.createWriteStream("output.txt");
const debuglogs = fs.createWriteStream("debuglogs.txt");

// pipe data streams from child process to parent streams
child.stdin.setEncoding('utf-8');
fileStream.pipe(child.stdin);
child.stderr.pipe(process.stderr);
child.stdout.pipe(output);

// console debugging
// child.stdout.pipe(process.stdout);
child.stdout.on("data", (data) => {
	process.stdout.write(`Parent Recieved:\n${data}\n`)
})

// close streams when no more data is to be read
fileStream.on("end", () => {
	console.log("no more data");
	process.stdin.end();
	child.stdin.end();
})
child.on("exit", () => {
	output.end();
	endTime = new Date();
	debuglogs.end(`stream ended after ${endTime - startTime} milliseconds`);

})



