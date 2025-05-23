import { isEmail, IsString } from 'class-validator';

export class ClientVerifyEmailDTO {
  @IsString()
  token!: string;
}
