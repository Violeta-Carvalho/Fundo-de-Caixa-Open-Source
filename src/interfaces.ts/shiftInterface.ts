export interface IShift {
	id?: number;
	member_name: string;
	started_at: Date;
	starting_value: number;
	expected_end_value?: number;
	actual_end_value?: number;
	ended_at?: Date;
	deleted_at?: Date;
}

export interface OpenShiftDTO {
	member_name: string;
	starting_value: number;
}

export interface CloseShiftDTO {
	expected_end_value: number;
	actual_end_value: number;
}
