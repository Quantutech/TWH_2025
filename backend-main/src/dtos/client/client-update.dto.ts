import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    Max,
    MaxLength,
    Min,
    MinLength
} from 'class-validator';
import { Gender } from '../../types/common-types';

export class ClientUpdateDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(1, { message: 'First name must be at least 1 character long' })
    @MaxLength(50, { message: 'First name must be no longer than 50 characters' })
    firstName?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(1, { message: 'Last name must be at least 1 character long' })
    @MaxLength(50, { message: 'Last name must be no longer than 50 characters' })
    lastName?: string;

    @IsOptional()
    @IsString()
    @MinLength(1, { message: 'Middle name must be at least 1 character long' })
    @MaxLength(50, { message: 'Middle name must be no longer than 50 characters' })
    middleName?: string;

    @IsNotEmpty()
    @IsDateString({}, { message: 'Birth date must be a valid ISO date string' })
    birthDate?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(11, {
        message: 'Social security number must be no longer than 11 characters',
    })
    socialSecurityNumber?: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^\+\d{1,3}\s?\d{4,14}$/, { message: 'Invalid phone number format' })
    phoneNumber?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {
        message: 'Country name must be no longer than 100 characters',
    })
    country?: string;

    @IsNotEmpty()
    @IsEnum(Gender, { message: 'Gender must be either Male, Female, or Other' })
    gender?: Gender;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {
        message: 'State name must be no longer than 100 characters',
    })
    state?: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {
        message: 'City name must be no longer than 100 characters',
    })
    city?: string;

    @IsNotEmpty()
    @IsString()
    zipCode?: string;

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
}
