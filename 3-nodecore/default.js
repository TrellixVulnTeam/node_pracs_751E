#!/home/junehan/.nvm/versions/node/v16.13.2/bin/node
const process = require("process");
/* Your code goes... */





/* Your code ends... */
process.on("beforeExit", (code) => {
	console.log("Process will be exit with exit: ", code);
});

process.on("exit", (code) => {
	console.log("Process exited with code: ", code);
});


