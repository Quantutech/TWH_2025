import { isEmail, IsString } from 'class-validator';

export class ProviderVerifyEmailDTO {
  @IsString()
  token!: string;
}
