import { IsString } from 'class-validator';

export class ClientSendVerifyEmailDTO {
  @IsString()
  email!: string;
}
