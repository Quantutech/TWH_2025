import { IsEmail, IsString } from 'class-validator';

export class ProviderSendVerifyEmailDTO {
  @IsString()
  @IsEmail()
  email!: string;
}
