import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CancelAppointmentDTO {
    @IsNotEmpty()
    @IsNumber()
    appointmentId!: number;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    reason?: string;
}
