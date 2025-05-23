import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmEmailDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    newEmail!: string;

    @IsNotEmpty()
    @IsString()
    verificationCode!: string;
}