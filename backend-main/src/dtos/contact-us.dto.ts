import { IsEmail, IsNotEmpty, IsNumberString, IsString, MaxLength } from 'class-validator';

export class ContactUsDTO {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    firstName!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    lastName!: string;

    @IsNotEmpty()
    @IsString()
    phone!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    message!: string;
}
