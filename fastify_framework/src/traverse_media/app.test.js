const { test } = require("tap");
const build = require("./app");
const prefix = "/items";

test(`requests the "${prefix}/" route`, async (t) => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/items/",
	});
	t.equal(response.statusCode, 200, "return a status code of 200");
});
test(`requests the "${prefix}/:id" route`, async (t) => {
	const app = build();

	const response = await app.inject({
		method: "GET",
		url: "/items/1",
	});
	t.equal(response.statusCode, 200, "return a status code of 200");
});
