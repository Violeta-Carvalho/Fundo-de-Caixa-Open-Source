import db from "./db";

const syncDB = async () => {
	await db.sync({ force: true });
};

syncDB();
