const path = require("path");
const express = require("express");
const { Sequelize } = require("sequelize");
const app = express();

app.configure(() => {
	app.use(express.logger("dev"));
	app.use(express.static(path.dirname(".") + "/static"));
	
});

