import { Request, Response } from "express";
import ShiftService from "../services/shiftService";

class ShiftController {
	async openShift(req: Request, res: Response) {
		try {
			const shiftControler = new ShiftService();
			const { body } = req;
			if (!body.member_name || !body.starting_value) {
				throw new Error("Missing fields.");
			}
			const newShift = await shiftControler.openNewShift(body);
			res.status(201).json(newShift);
		} catch (e: any) {
			res.status(400).json({ message: e.message });
		}
	}

	async getOneShift(req: Request, res: Response) {
		try {
			const shiftControler = new ShiftService();
			const id = parseInt(req.params.id);
			const shift = await shiftControler.getShiftById(id);
			res.status(200).json(shift);
		} catch (e: any) {
			res.status(400).json({ message: e.message });
		}
	}

	async getAllShifts(req: Request, res: Response) {
		try {
			const shiftControler = new ShiftService();
			const { query } = req;
			let limit, page;

			limit = parseInt(query.limit as string);
			if (limit < 1 || !limit) {
				limit = 20;
			}

			page = parseInt(query.page as string);
			if (page < 0 || !page) {
				page = 0;
			}

			const shifts = await shiftControler.getAllShifts(limit, page);
			res.status(200).json(shifts);
		} catch (e: any) {
			res.status(400).json({ message: e.message });
		}
	}

	async closeShift(req: Request, res: Response) {
		try {
			const shiftControler = new ShiftService();
			const id = parseInt(req.params.id);
			const { body } = req;
			if (!body.expected_end_value || !body.actual_end_value) {
				throw new Error("Missing fields.");
			}
			const shift = await shiftControler.closeShift(id, body);
			res.status(200).json(shift);
		} catch (e: any) {
			res.status(400).json({ message: e.message });
		}
	}

	async deleteShift(req: Request, res: Response) {
		try {
			const shiftControler = new ShiftService();
			const id = parseInt(req.params.id);
			await shiftControler.deleteShift(id);
			res.status(204);
		} catch (e: any) {
			res.status(400).json({ message: e.message });
		}
	}
}

export default ShiftController;
