import { Type } from "class-transformer";
import {
	ArrayNotEmpty,
	IsArray,
	IsDateString,
	IsEmail,
	IsEnum,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	Matches,
	Max,
	MaxLength,
	Min,
	MinLength,
} from "class-validator";
import { Match } from "../../../api/decorators/match";
import { DayOfWeekEnum, Gender } from "../../../types/common-types";

export class AdminUserCreateDTO {
	@IsString()
	@MinLength(1, { message: "First name must be at least 1 character long" })
	@MaxLength(50, { message: "First name must be no longer than 50 characters" })
	firstName!: string;

	@IsString()
	@MinLength(1, { message: "Last name must be at least 1 character long" })
	@MaxLength(50, { message: "Last name must be no longer than 50 characters" })
	lastName!: string;

	@IsEmail({}, { message: "Email must be a valid email address" })
	@MaxLength(100, { message: "Email must be no longer than 100 characters" })
	email!: string;

	@IsString()
	@MinLength(8, { message: "Password must be at least 8 characters long" })
	@MaxLength(50, { message: "Password must be no longer than 50 characters" })
	@Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
		message:
			"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
	})
	password!: string;

	@IsString()
	@Match("password", {
		message: "Confirm Password must match Password",
	})
	confirmPassword!: string;

	profileSlug?: string;
}

export class AdminClientUpdateDTO {
	@Type(() => Number)
	@IsNumber({}, { message: "ID must be a number" })
	id!: number;

	@IsOptional()
	@IsString()
	@MinLength(1, { message: "First name must be at least 1 character long" })
	@MaxLength(50, { message: "First name must be no longer than 50 characters" })
	firstName?: string;

	@IsOptional()
	@IsString()
	@MinLength(1, { message: "Last name must be at least 1 character long" })
	@MaxLength(50, { message: "Last name must be no longer than 50 characters" })
	lastName?: string;

	@IsOptional()
	@IsString()
	@MinLength(1, { message: "Middle name must be at least 1 character long" })
	@MaxLength(50, {
		message: "Middle name must be no longer than 50 characters",
	})
	middleName?: string;

	@IsOptional()
	@IsDateString({}, { message: "Birth date must be a valid ISO date string" })
	birthDate?: string;

	@IsOptional()
	@IsString()
	@MaxLength(11, {
		message: "Social security number must be no longer than 11 characters",
	})
	socialSecurityNumber?: string;

	@IsOptional()
	@IsString()
	@Matches(/^\+\d{1,3}\s?\d{4,14}$/, { message: "Invalid phone number format" })
	phoneNumber?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "Country name must be no longer than 100 characters",
	})
	country?: string;

	@IsOptional()
	@IsEnum(Gender, { message: "Gender must be either Male, Female, or Other" })
	gender?: Gender;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "State name must be no longer than 100 characters",
	})
	state?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "City name must be no longer than 100 characters",
	})
	city?: string;

	@IsOptional()
	@IsString()
	zipCode?: string;

	@IsOptional()
	@IsNumber({}, { message: "Latitude must be a valid number" })
	@Min(-90, { message: "Latitude must be at least -90" })
	@Max(90, { message: "Latitude must be at most 90" })
	lat?: number;

	@IsOptional()
	@IsNumber({}, { message: "Longitude must be a valid number" })
	@Min(-180, { message: "Longitude must be at least -180" })
	@Max(180, { message: "Longitude must be at most 180" })
	long?: number;
}

export class AdminProviderUpdateDTO {
	@IsOptional()
	@IsString()
	@MinLength(1, { message: "First name must be at least 1 character long" })
	@MaxLength(50, { message: "First name must be no longer than 50 characters" })
	firstName?: string;

	@IsOptional()
	@IsString()
	@MinLength(1, { message: "Last name must be at least 1 character long" })
	@MaxLength(50, { message: "Last name must be no longer than 50 characters" })
	lastName?: string;

	@IsOptional()
	@IsString()
	@MinLength(1, { message: "Middle name must be at least 1 character long" })
	@MaxLength(50, {
		message: "Middle name must be no longer than 50 characters",
	})
	middleName?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "Professional title must be no longer than 100 characters",
	})
	professionalTitle?: string;

	@IsOptional()
	@IsNumber()
	licenseNumber?: number;

	@IsOptional()
	@IsString()
	@MaxLength(50, {
		message: "License state must be no longer than 50 characters",
	})
	licenseState?: string;

	@IsOptional()
	@IsInt({ message: "Years of experience must be a valid number" })
	yearsExperience?: number;

	@IsOptional()
	@IsString()
	@MaxLength(200, {
		message: "Education must be no longer than 200 characters",
	})
	education?: string;

	@IsOptional()
	@IsString()
	@MaxLength(500, { message: "Bio must be no longer than 500 characters" })
	bio?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	youtubeUrl?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	facebookUrl?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	instagramUrl?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	xUrl?: string;

	@IsOptional()
	@IsArray()
	@ArrayNotEmpty({ message: "Specialities cannot be an empty array" })
	specialities?: number[];

	@IsOptional()
	@IsArray()
	@ArrayNotEmpty({ message: "Languages cannot be an empty array" })
	languages?: number[];

	@IsOptional()
	@IsArray()
	@ArrayNotEmpty({ message: "AppointmentTypes cannot be an empty array" })
	appointmentTypes?: number[];

	@IsOptional()
	@IsArray()
	@ArrayNotEmpty({ message: "Insurances cannot be an empty array" })
	insurances?: number[];

	@IsOptional()
	@IsString()
	@Matches(/^\+\d{1,3}\s?\d{4,14}$/, { message: "Invalid phone number format" })
	phoneNumber!: string;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "Country name must be no longer than 100 characters",
	})
	country?: string;

	@IsOptional()
	@IsEnum(Gender)
	gender?: Gender;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "State name must be no longer than 100 characters",
	})
	state?: string;

	@IsOptional()
	@IsString()
	@MaxLength(100, {
		message: "City name must be no longer than 100 characters",
	})
	city?: string;

	@IsOptional()
	@IsString()
	zipCode?: any;

	@IsOptional()
	@IsString()
	@MaxLength(500, {
		message: "Street address must be no longer than 500 characters",
	})
	streetAddress?: string;

	@IsOptional()
	@IsNumber({}, { message: "Latitude must be a valid number" })
	@Min(-90, { message: "Latitude must be at least -90" })
	@Max(90, { message: "Latitude must be at most 90" })
	lat?: number;

	@IsOptional()
	@IsNumber({}, { message: "Longitude must be a valid number" })
	@Min(-180, { message: "Longitude must be at least -180" })
	@Max(180, { message: "Longitude must be at most 180" })
	long?: number;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	externalAppointmentUrl?: string;

	@IsOptional()
	@IsArray()
	workingHours!: {
		dayOfWeek: DayOfWeekEnum;
		startTime: string;
		endTime: string;
	}[];

	@IsEnum(
		{ external: "external", our_system: "our_system" },
		{
			message:
				'Appointment calendar type must be either "external" or "our_system"',
		},
	)
	@IsOptional()
	appointmentCalendarType?: "external" | "our_system";
}
