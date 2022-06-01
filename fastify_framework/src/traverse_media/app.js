function build(opts = {}) {
	const fastify = require("fastify")({
		logger: {
			prettyPrint:
				process.env["NODE_ENV"] !== "production"
					? {
							translateTime: "HH:MM:ss Z",
							ignore: "pid,hostname",
					  }
					: false,
		},
	});
	fastify.register(require("fastify-swagger"), {
		exposeRoute: true,
		routePrefix: "/docs",
		swagger: {
			info: { title: "fastify-api Doc" },
		},
	});
	fastify.register(require("./item/routes"));
	return fastify;
}

module.exports = build;
