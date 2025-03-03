import {
	CloseShiftDTO,
	IPaginatedShifts,
	OpenShiftDTO,
} from "../interfaces/shiftInterface";
import Shift from "../models/shiftModel";
import { Op } from "sequelize";

class ShiftService {
	async paginateShifts(
		shifts: any[],
		limit: number,
		page: number
	): Promise<IPaginatedShifts> {
		const totalShifts = await Shift.count({
			where: {
				deleted_at: { [Op.eq]: undefined },
			},
		});

		let last_page = Math.ceil(totalShifts / limit) - 1;

		if (last_page < 0) {
			last_page = 0;
		}

		const paginatedShifts = {
			current_page: page,
			last_page,
			amount_shown: shifts.length,
			content: shifts,
		};

		return paginatedShifts;
	}

	async getOpenShifts(): Promise<Shift[]> {
		const openShifts = await Shift.findAll({
			where: {
				ended_at: { [Op.eq]: undefined },
				deleted_at: { [Op.eq]: undefined },
			},
		});

		return openShifts;
	}

	async openNewShift(shift: OpenShiftDTO): Promise<Shift> {
		const openShifts = await this.getOpenShifts();

		if (openShifts.length > 0) {
			throw new Error("There is an open shift already.");
		}

		const { member_name, starting_value } = shift;
		const now = new Date();
		const openedShift = await Shift.create({
			member_name,
			starting_value,
			started_at: now,
		});

		return openedShift;
	}

	async getShiftById(id: number): Promise<Shift | null> {
		const shift = await Shift.findOne({
			where: {
				id,
				deleted_at: { [Op.eq]: undefined },
			},
		});

		return shift;
	}

	async getAllShifts(limit: number, page: number): Promise<IPaginatedShifts> {
		const shifts = await Shift.findAll({
			where: {
				deleted_at: { [Op.eq]: undefined },
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

		if (!currentShift || currentShift?.ended_at) {
			throw new Error("Shift does not exist or is already closed.");
		}

		const { actual_end_value, expected_end_value } = new_shift_values;
		const now = new Date();

		await Shift.update(
			{
				actual_end_value,
				expected_end_value,
				ended_at: now,
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
				deleted_at: now,
			},
			{
				where: { id },
			}
		);

		return;
	}
}

export default ShiftService;
