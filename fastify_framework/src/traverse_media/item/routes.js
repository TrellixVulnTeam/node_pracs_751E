const {
	listItemHandler,
	getItemHandler,
	createItemHandler,
	deleteItemHandler,
	updateItemHandler,
} = require("./handlers");

const Item = {
	type: "object",
	properties: {
		id: { type: "string" /*"integer"*/ },
		name: { type: "string" },
	},
};

const listItemOpts = {
	schema: {
		response: {
			200: {
				type: "array",
				items: Item,
			},
		},
	},
	handler: listItemHandler,
};

const getItemOpts = {
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
		},
		response: {
			200: Item,
			404: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: getItemHandler,
};

const createItemOpts = {
	schema: {
		body: {
			type: "object",
			required: ["name"],
			properties: {
				name: { type: "string" },
			},
		},
		response: {
			201: Item,
		},
	},
	handler: createItemHandler,
};

const deleteItemOpts = {
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
		},
		response: {
			200: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
			404: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: deleteItemHandler,
};

const updateItemOpts = {
	schema: {
		params: {
			type: "object",
			properties: {
				id: { type: "string" },
			},
		},
		body: {
			type: "object",
			required: ["name"],
			properties: {
				name: { type: "string" },
			},
		},
		response: {
			200: Item,
			404: {
				type: "object",
				properties: {
					message: { type: "string" },
				},
			},
		},
	},
	handler: updateItemHandler,
};

function itemRoutes(fastify, option, done) {
	// GET all items
	fastify.get("/items", listItemOpts);

	// Create One item
	fastify.post("/items", createItemOpts);

	// Get single item
	fastify.get("/items/:id", getItemOpts);

	// Delete signle item
	fastify.delete("/items/:id", deleteItemOpts);

	// Update single item
	fastify.put("/items/:id", updateItemOpts);

	done();
}
module.exports = itemRoutes;
