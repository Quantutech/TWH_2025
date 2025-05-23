import { IsDateString, IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { AppointmentStatus } from '../../types/common-types';

export class AppointmentListDTO {
    @IsOptional()
    @IsNumberString()
    page = 1;

    @IsOptional()
    @IsNumberString()
    limit = 20;

    @IsOptional()
    @IsString()
    keyword?: string;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?: AppointmentStatus;

    @IsOptional()
    @IsDateString()
    from_date?: string;

    @IsOptional()
    @IsDateString()
    to_date?: string;

    providerId!: number
}
