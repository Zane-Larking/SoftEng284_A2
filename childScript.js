
process.stdin.on("data", (data) => {
	process.stdout.write(`Child just received:\n${data}`);
})

