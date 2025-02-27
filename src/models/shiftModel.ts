import { DataTypes, Model } from "sequelize";
import db from "../database/db";

class Shift extends Model {}

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
