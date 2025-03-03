import Shift from "../models/shiftModel";
import { IPaginated } from "./sharedInterface";

export interface IPaginatedShifts extends IPaginated {
	content: Shift[];
}

export interface OpenShiftDTO {
	member_name: string;
	starting_value: number;
}

export interface CloseShiftDTO {
	expected_end_value: number;
	actual_end_value: number;
}
