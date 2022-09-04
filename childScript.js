

// process.stdin.pipe(process.stdout);
process.stdin.on("data", (data) => {
	process.stdout.write(`Child just received:\n${data.toString().trim()}`);
})
