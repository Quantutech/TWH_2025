import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendReminderDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    title!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    message!: string;
}
