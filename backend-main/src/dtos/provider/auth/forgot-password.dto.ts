import { IsEmail, IsString } from 'class-validator';

export class ProviderForgotPasswordDTO {
  @IsString()
  @IsEmail()
  email!: string;
}
