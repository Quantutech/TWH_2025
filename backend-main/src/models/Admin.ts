import { Column, DataType, Model } from "sequelize-typescript";
import DBModel from "../decorators/model";

@DBModel("admins")
export default class Admin extends Model {
	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	})
	isSuper!: boolean;

	@Column({
		type: DataType.STRING(250),
		allowNull: false,
		unique: true,
	})
	email!: string;

	@Column({
		type: DataType.STRING(100),
		allowNull: false,
	})
	password!: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	firstName!: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: true,
	})
	middleName?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
	})
	lastName!: string;

	@Column({
		type: DataType.STRING(15),
		allowNull: true,
	})
	phoneNumber!: string;

	@Column({
		type: DataType.STRING(255),
		allowNull: true,
	})
	profilePictureUrl?: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: true,
	})
	profileSlug?: string;
}
