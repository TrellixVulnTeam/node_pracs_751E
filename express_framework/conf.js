const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./sqlite.db"
});

async function connectDB() {
	try {
		const ret = await sequelize.authenticate();
		console.log("Connection has been established");
		return (ret);
	} catch (err) {
		console.error("unable to connect db", err);
	}
}

async function closeDB() {
	try {
		await sequelize.close();
		console.log("Connection has been closed");
	} catch (err) {
		console.error("something wrong", err);
	}
}

connectDB().then(() => closeDB());


