import {
  ArrayNotEmpty,
  IsArray,
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
  ValidateIf
} from 'class-validator';
import { DayOfWeekEnum, Gender } from '../../types/common-types';

export class ProviderDeshboardUpdateDTO {
  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'First name must be at least 1 character long' })
  @MaxLength(50, { message: 'First name must be no longer than 50 characters' })
  firstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'Last name must be at least 1 character long' })
  @MaxLength(50, { message: 'Last name must be no longer than 50 characters' })
  lastName?: string;

  @IsString()
  @IsOptional()
  @MinLength(1, { message: 'Middle name must be at least 1 character long' })
  @MaxLength(50, {
    message: 'Middle name must be no longer than 50 characters',
  })
  middleName?: string;

  @IsString()
  @MaxLength(100, {
    message: 'Professional title must be no longer than 100 characters',
  })
  professionalTitle?: string;

  @IsNumber()
  licenseNumber?: number;

  @IsString()
  @MaxLength(50, {
    message: 'License state must be no longer than 50 characters',
  })
  licenseState?: string;

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

  @IsArray()
  @ArrayNotEmpty({ message: 'Specialities cannot be an empty array' })
  specialities?: number[];

  @ValidateIf((o) => o.appointmentCalendarType === 'our_system')
  @IsArray()
  @ArrayNotEmpty({ message: 'Languages cannot be an empty array' })
  languages?: number[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ message: 'AppointmentTypes cannot be an empty array' })
  appointmentTypes?: number[];

  @ValidateIf((o) => o.appointmentCalendarType === 'our_system')
  @IsArray()
  @ArrayNotEmpty({ message: 'Insurances cannot be an empty array' })
  insurances?: number[];

  @IsString()
  @Matches(/^\+\d{1,3}\s?\d{4,14}$/, { message: 'Invalid phone number format' })
  phoneNumber!: string;

  @IsString()
  @MaxLength(100, {
    message: 'Country name must be no longer than 100 characters',
  })
  country?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsString()
  @MaxLength(100, {
    message: 'State name must be no longer than 100 characters',
  })
  state?: string;

  @IsString()
  @MaxLength(100, {
    message: 'City name must be no longer than 100 characters',
  })
  city?: string;

  @IsString()
  zipCode?: number;

  @IsString()
  @MaxLength(500, {
    message: 'Street address must be no longer than 500 characters',
  })
  streetAddress?: string;

  @IsNumber({}, { message: 'Latitude must be a valid number' })
  @IsOptional()
  @Min(-90, { message: 'Latitude must be at least -90' })
  @Max(90, { message: 'Latitude must be at most 90' })
  lat?: number;

  @IsNumber({}, { message: 'Longitude must be a valid number' })
  @IsOptional()
  @Min(-180, { message: 'Longitude must be at least -180' })
  @Max(180, { message: 'Longitude must be at most 180' })
  long?: number;

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
  appointmentCalendarType?: 'external' | 'our_system';

  @ValidateIf((o) => o.appointmentCalendarType === 'external')
  @IsString({ message: 'External appointment URL must be a string' })
  @MaxLength(100, { message: 'External appointment URL must be no longer than 100 characters' })
  externalAppointmentUrl?: string;
}
