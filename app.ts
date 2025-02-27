import express from "express";
import shiftRouter from "./src/routes/shiftRouters";

const app = express();
const port = 3000;

app.use(express.json());
app.use(shiftRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
