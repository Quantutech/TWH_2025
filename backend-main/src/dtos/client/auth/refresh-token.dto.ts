import { IsString } from 'class-validator';

export class ClientRefreshTokenDto {
  @IsString()
  refreshToken!: string;
}
