import { DataTypes, Model } from "sequelize";
import db from "../database/db";

type ShiftAttributes = {
	id: number;
	member_name: string;
	started_at: Date;
	ended_at?: Date;
	deleted_at?: Date;
	starting_value: number;
	expected_end_value?: number;
	actual_end_value?: number;
}

type ShiftCreationAttributes = {
	member_name: string;
	started_at: Date;
	starting_value: number;
}

class Shift extends Model<ShiftAttributes, ShiftCreationAttributes> {
	ended_at?: Date;
}

Shift.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		member_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		started_at: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		ended_at: {
			type: DataTypes.DATE,
		},
		deleted_at: {
			type: DataTypes.DATE,
		},
		starting_value: {
			type: DataTypes.DOUBLE,
			allowNull: false,
		},
		expected_end_value: {
			type: DataTypes.DOUBLE,
		},
		actual_end_value: {
			type: DataTypes.DOUBLE,
		},
	},
	{
		sequelize: db,
		modelName: "Shift",
	}
);

export default Shift;
