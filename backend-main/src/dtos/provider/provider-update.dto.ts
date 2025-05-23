import {
    ArrayNotEmpty,
    IsArray,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    isString,
    IsString,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';
import { DayOfWeekEnum, Gender } from '../../types/common-types';

export class ProviderUpdateDTO {
    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'First name must be at least 1 character long' })
    @MaxLength(50, { message: 'First name must be no longer than 50 characters' })
    firstName?: string;

    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'Last name must be at least 1 character long' })
    @MaxLength(50, { message: 'Last name must be no longer than 50 characters' })
    lastName?: string;

    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'Middle name must be at least 1 character long' })
    @MaxLength(50, {
        message: 'Middle name must be no longer than 50 characters',
    })
    middleName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, {
        message: 'Professional title must be no longer than 100 characters',
    })
    professionalTitle?: string;

    @IsOptional()
    @IsNumber()
    licenseNumber?: number;

    @IsOptional()
    @IsString()
    @MaxLength(50, {
        message: 'License state must be no longer than 50 characters',
    })
    licenseState?: string;

    @IsOptional()
    @IsInt({ message: 'Years of experience must be a valid number' })
    yearsExperience?: number;

    @IsOptional()
    @IsString()
    @MaxLength(500, {
        message: 'Education must be no longer than 500 characters',
    })
    education?: string;

    @IsOptional()
    @IsString()
    @MaxLength(5000, { message: 'Bio must be no longer than 5000 characters' })
    bio?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    youtubeUrl?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    facebookUrl?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    instagramUrl?: string

    @IsOptional()
    @IsString()
    @MaxLength(100)
    xUrl?: string

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Specialities cannot be an empty array' })
    specialities?: number[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Languages cannot be an empty array' })
    languages?: number[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'AppointmentTypes cannot be an empty array' })
    appointmentTypes?: number[];

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty({ message: 'Insurances cannot be an empty array' })
    insurances?: number[];

    @IsOptional()
    @IsString()
    @Matches(/^\+\d{1,3}\s?\d{4,14}$/, { message: 'Invalid phone number format' })
    phoneNumber!: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, {
        message: 'Country name must be no longer than 100 characters',
    })
    country?: string;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsString()
    @MaxLength(100, {
        message: 'State name must be no longer than 100 characters',
    })
    state?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, {
        message: 'City name must be no longer than 100 characters',
    })
    city?: string;

    @IsOptional()
    @IsString()
    zipCode?: any;

    @IsOptional()
    @IsString()
    @MaxLength(500, {
        message: 'Street address must be no longer than 500 characters',
    })
    streetAddress?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Latitude must be a valid number' })
    @Min(-90, { message: 'Latitude must be at least -90' })
    @Max(90, { message: 'Latitude must be at most 90' })
    lat?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Longitude must be a valid number' })
    @Min(-180, { message: 'Longitude must be at least -180' })
    @Max(180, { message: 'Longitude must be at most 180' })
    long?: number;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    externalAppointmentUrl?: string

    @IsOptional()
    @IsArray()
    workingHours!: {
        dayOfWeek: DayOfWeekEnum;
        startTime: string;
        endTime: string;
    }[];

    @IsEnum({ external: 'external', our_system: 'our_system' }, {
        message: 'Appointment calendar type must be either "external" or "our_system"',
    })
    @IsOptional()
    appointmentCalendarType?: 'external' | 'our_system';
}
