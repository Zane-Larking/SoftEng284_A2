//Use by running the following command
//node readStdin.js Q4.js A2.input.test1.txt

const fs = require('fs');
const args = require('process').argv.slice(2);

let childName = args[0] ? args[0] : 'childScript.js';
let text = args[1];

var child_process = require('child_process'),
	child = child_process.spawn('node', [childName]);

let output = fs.createWriteStream("output.txt");
let debuglogs = fs.createWriteStream("debuglogs.txt");

// output.write("testing write");
child.stdin.setEncoding('utf-8');
child.stderr.pipe(process.stderr);
// child.stdout.pipe(process.stdout);
child.stdout.pipe(output);

fs.open(text, (err1, fd) => {
	

	fs.read(fd, (err2, bytesRead, data) => {
		if (err2) {
			debuglogs.write(err2);
		}
		child.stdin.write(data.toString().trim());
	});

	// child.kill('SIGINT');
	fs.close(fd)

});

child.stdout.on("exit", () => {
	output.end();
	debuglogs.end();
})



