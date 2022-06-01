const PORT = 3000;
const server = require("./traverse_media/app")();

server.listen(PORT, (err, address) => {
	if (err) {
		server.log.error(err);
		process.exit(1);
	}
	console.log("address: ", address);
});
