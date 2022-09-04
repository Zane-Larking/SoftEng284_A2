
const readline = require('readline');

// readline interface
const rl = readline.createInterface({
	input: process.stdin,
	terminal: false
});


// pipe stream to child process
rl.on('line', (line) => {
	process.stdout.write(`line: ${line}\n`);
});


// process.stdin.pipe(process.stdout);
// process.stdin.on("data", (data) => {
// 	process.stdout.write(`Child just received:\n${data.toString().trim()}`);
// })
