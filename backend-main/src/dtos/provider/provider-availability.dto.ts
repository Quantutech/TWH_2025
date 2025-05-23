import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DayOfWeekEnum } from '../../types/common-types';

export class ProviderAvailabilityDTO {
    @IsNotEmpty()
    @IsArray()
    workingHours!: {
        dayOfWeek: DayOfWeekEnum
        startTime: string;
        endTime: string;
    }[];
}
