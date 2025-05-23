import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDTO {
  @IsNotEmpty()
  @IsDateString()
  slotTime!: Date;

  @IsNotEmpty()
  @IsInt()
  providerId!: number;

  @IsOptional()
  @IsInt()
  insuranceId?: number;

  @IsNotEmpty()
  @IsNumber()
  appointmentTypeId!: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
