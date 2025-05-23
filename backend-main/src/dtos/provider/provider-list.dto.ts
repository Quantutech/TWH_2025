import { Transform, Type } from 'class-transformer';
import {
  IsBooleanString, IsEnum,
  IsNumberString,
  IsOptional,
  IsString
} from 'class-validator';
import { AppointmentTypeEnum, DayOfWeekEnum, Gender, SortingType } from '../../types/common-types';
export class ProviderListDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  limit = 10;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  languages?: string;

  @IsOptional()
  insurances?: string;

  @IsOptional()
  specialities?: string;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBooleanString()
  isAvailable?: boolean;

  @IsOptional()
  @IsString()
  lat?: string;

  @IsOptional()
  @IsString()
  long?: string;

  @IsOptional()
  @IsEnum(AppointmentTypeEnum)
  appointmentType?: AppointmentTypeEnum;

  @IsOptional()
  @IsEnum(DayOfWeekEnum)
  dayOfWeek?: string;

  @IsOptional()
  @IsString()
  @IsEnum(SortingType)
  sort?: SortingType
}

