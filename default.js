#!/home/junehan/.nvm/versions/node/v16.13.2/bin/node
/* setup start */
const process = require("process");
process.on("beforeExit", (code) => {
	console.log("Process will be exit with exit: ", code);
});

process.on("exit", (code) => {
	console.log("Process exited with code: ", code);
});

/* setup end */

/* Your code start */
function main() {
}

main();
/* Your code end */

/* OUTPUT
Process will be exit with exit:  0
Process exited with code:  0
*/
