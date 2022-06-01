const items = require("./items");
const {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
} = require("./functions");

module.exports = {
	listItemHandler: async (req, reply) => {
		return reply.send(await getAll());
	},
	getItemHandler: async (req, reply) => {
		const { id } = req.params;
		const item = await getOne(id);

		return item
			? reply.code(200).send(item)
			: reply.code(404).send(`Item ${id} was not found`);
	},
	createItemHandler: async (req, reply) => {
		const { name } = req.body;

		return reply.code(201).send(await createOne(name));
	},
	deleteItemHandler: async (req, reply) => {
		const { id } = req.params;

		return (await deleteOne(id))
			? reply.code(200).send("OK")
			: reply.code(404).send(`Item ${id} was not found`);
	},
	updateItemHandler: async (req, reply) => {
		const { id } = req.params;
		const { name } = req.body;
		const item = await updateOne(id, name);

		return item
			? reply.code(200).send(item)
			: reply.code(404).send(`Item ${id} was not found`);
	},
};
