import { Database, Statement } from "sqlite";
import {
	CloseShiftDTO,
	IShift,
	OpenShiftDTO,
} from "../interfaces.ts/shiftInterface";
import Shift from "../models/shiftModel";
import { Op } from "sequelize";

class ShiftService {
	async paginateShifts(
		shifts: any[],
		limit: number,
		page: number
	): Promise<any> {
		const totalShifts = await Shift.count({
			where: {
				deleted_at: { [Op.eq]: null },
			},
		});

		const paginatedShifts = {
			current_page: page,
			last_page: Math.ceil(totalShifts / limit) - 1,
			amount_shown: shifts.length,
			content: shifts,
		};

		return paginatedShifts;
	}

	async getOpenShifts(): Promise<any[]> {
		const openShifts = await Shift.findAll({
			where: {
				ended_at: { [Op.eq]: null },
				deleted_at: { [Op.eq]: null },
			},
		});
		return openShifts;
	}

	async openNewShift(shift: OpenShiftDTO): Promise<any> {
		const openShifts = await this.getOpenShifts();
		console.log(openShifts);

		if (openShifts.length > 0) {
			throw new Error("There is an open shift already.");
		}

		const { member_name, starting_value } = shift;
		const now = new Date();
		const openedShift = await Shift.create({
			member_name,
			starting_value,
			started_at: now.toISOString(),
		});

		return openedShift;
	}

	async getShiftById(id: number): Promise<any> {
		const shift = await Shift.findOne({
			where: {
				id,
				deleted_at: { [Op.eq]: null },
			},
		});
		return shift;
	}

	async getAllShifts(limit: number, page: number): Promise<any[]> {
		const shifts = await Shift.findAll({
			where: {
				deleted_at: { [Op.eq]: null },
			},
			limit,
			offset: page * limit,
		});

		const paginatedShifts = await this.paginateShifts(shifts, limit, page);
		return paginatedShifts;
	}

	async closeShift(
		id: number,
		new_shift_values: CloseShiftDTO
	): Promise<any> {
		const currentShift = await this.getShiftById(id);

		if (!currentShift || currentShift.ended_at) {
			throw new Error("Shift does not exist or is already closed.");
		}

		const { actual_end_value, expected_end_value } = new_shift_values;
		const now = new Date();

		await Shift.update(
			{
				actual_end_value,
				expected_end_value,
				ended_at: now.toISOString(),
			},
			{
				where: { id },
			}
		);

		const updatedShift = await this.getShiftById(id);
		return updatedShift;
	}

	async deleteShift(id: number): Promise<void> {
		const currentShift = await this.getShiftById(id);

		if (!currentShift) {
			throw new Error("Shift does not exist or is already deleted.");
		}
		const now = new Date();
		await Shift.update(
			{
				deleted_at: now.toISOString(),
			},
			{
				where: { id },
			}
		);

		return;
	}
}

export default ShiftService;
