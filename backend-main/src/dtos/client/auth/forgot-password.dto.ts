import { IsString } from 'class-validator';

export class ClientForgotPasswordDTO {
  @IsString()
  email!: string;
}
