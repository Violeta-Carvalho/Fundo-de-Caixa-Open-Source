import { Sequelize } from "sequelize";

const db = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sequelize",
});

export default db;
