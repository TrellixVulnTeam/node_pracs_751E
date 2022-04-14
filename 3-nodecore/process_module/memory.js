#!/home/junehan/.nvm/versions/node/v16.13.2/bin/node
const process = require("process");
process.on("beforeExit", (code) => {
	console.log("Process will be exit with exit: ", code);
});

process.on("exit", (code) => {
	console.log("Process exited with code: ", code);
});

/* Your code goes... */
function write(d) {
	process.stdout.write("data recevied: "+ d);
	const {rss, heapTotal, heapUsed} = process.memoryUsage();
	process.stdout.write(`rss: ${rss}, heapsize: ${heapTotal}, used:${heapUsed}`);
}


function main() {
	process.stdin.resume();
	process.stdin.on("data", write);
}


main();
/* Your code ends... */

