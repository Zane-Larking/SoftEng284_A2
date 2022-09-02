// console.log(...process.argv.slice(2));
process.stdin.on('data', data => {
	// process.stdout.write(process.argv);
	process.stdout.write(data);
	// process.exit();
});
