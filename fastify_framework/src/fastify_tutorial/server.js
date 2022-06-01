// CommonJs
const fastify = require("fastify")({ logger: true });
const PORT = 3000;

/* 0.1 EXPORT AS Route
fastify.get("/", async (request, reply) => {
	reply.send({ hello: "world" });
});
*/
fastify.register(require("./our-first-route"));

const start = async (port) =>
	await fastify.listen(port, (err, address) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}
	});

start(PORT);
