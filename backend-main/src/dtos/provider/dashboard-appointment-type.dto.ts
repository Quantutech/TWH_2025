import { IsEnum } from 'class-validator';
import { DateRange } from '../../types/common-types';

export class ProviderDashboardAppointmentTypeDTO {
    @IsEnum(DateRange)
    type!: DateRange;
}