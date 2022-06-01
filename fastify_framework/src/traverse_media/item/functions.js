const { v4: uuidv4 } = require("uuid");
let items = require("./items");

async function getAll() {
	return items;
}

async function getOne(id) {
	return items.find((item) => item.id === id);
}

async function createOne(name) {
	const item = { id: uuidv4(), name };

	return items.push(item) ? item : null;
}

async function deleteOne(id) {
	const item = { id: id };
	const len = items.length;
	items = items.filter((items) => items.id !== id);

	return len > items.length ? item : null;
}

async function updateOne(id, name) {
	items = items.map((item) => (item.id === id ? { id, name } : item));

	return items.find((item) => item.id === id);
}
module.exports = {
	getAll,
	getOne,
	createOne,
	deleteOne,
	updateOne,
};
