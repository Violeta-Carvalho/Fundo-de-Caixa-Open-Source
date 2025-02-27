import express, { Request, Response } from "express";
import ShiftController from "../controllers/shiftController";

const router = express.Router();
const shiftControler = new ShiftController();

router.post("/shifts/new", async (req: Request, res: Response) => {
	await shiftControler.openShift(req, res);
});

router.get("/shifts/read/", async (req: Request, res: Response) => {
	await shiftControler.getAllShifts(req, res);
});

router.get("/shifts/read/:id", async (req: Request, res: Response) => {
	await shiftControler.getOneShift(req, res);
});

router.put("/shifts/close/:id", async (req: Request, res: Response) => {
	await shiftControler.closeShift(req, res);
});

router.delete("/shifts/:id", async (req: Request, res: Response) => {
	await shiftControler.deleteShift(req, res);
});

export default router;
