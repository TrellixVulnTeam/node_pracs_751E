#!/home/junehan/.nvm/versions/node/v16.13.2/bin/node
const process = require("process");
process.on("beforeExit", (code) => {
	console.log("Process will be exit with exit: ", code);
});

process.on("exit", (code) => {
	console.log("Process exited with code: ", code);
});

/* Your code goes... */
function run_as_async(data, cb) {
	setTimeout(() => cb(data + " with setTimeout."), 0);
	process.nextTick(() => cb(data));
}

function main() {
	run_as_async("hihihi at async", console.log);
	console.log("hi at sync");
}

main();
/* Your code ends... */

/* OUTPUT
hi at sync
hihihi at async
hihihi at async with setTimeout.
Process will be exit with exit:  0
Process exited with code:  0
*/
