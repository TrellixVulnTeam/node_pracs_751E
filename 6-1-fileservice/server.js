/* setup start */
const process = require("process");
process.on("beforeExit", (code) => {
	console.log("Process will be exit with exit: ", code);
});

process.on("exit", (code) => {
	console.log("Process exited with code: ", code);
});

const http = require("http");
const path = require("path");
const fs = require("fs");
const {checkfile} = require("./fileservice");
const base = "/home/junehan/Documents/CURRENT/nodes/node_pracs/6-1-fileservice/statics";
/* setup end */
/*function checkfile(pathName);*/

/* Your code start */
async function requestHandler(req, res) {
	const pathname = base + req.url;
	console.log(pathname);
	if (req.url) {
		const prom = checkfile(pathname);
		prom.then(() => {
			res.setHeader("Content-Type", "test/html");
			res.statusCode = 200;
			const body = fs.createReadStream(pathname);
			body.on("open", () => body.pipe(res));
			body.on("error", (err) => {res.statusCode = 500; console.log(err); res.write("STREAM ERROR");});
			body.on("close", () => console.log("closed"));
			console.log("fin");
		});
		prom.catch(() => {
			console.log("2");
			res.statusCode = 400;
			console.log("2-2");
			res.write("file not found 404\n");
		});
		console.log("3");
	} else {
		res.writeHead(404);
		res.write("Bad Request 404\n");
	}
}

function makeServer() {
	const ret = http.createServer(function (req, res) {
		console.log(req.url);
		requestHandler(req, res);
	});
	return (ret);
};

const server = makeServer();
server.listen(8124);
console.log("server running at 8124");

/* Your code end */

/* OUTPUT
Process will be exit with exit:  0
Process exited with code:  0
*/
