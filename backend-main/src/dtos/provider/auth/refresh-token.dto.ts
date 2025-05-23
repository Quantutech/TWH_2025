import { IsString } from 'class-validator';

export class ProviderRefreshTokenDto {
  @IsString()
  refreshToken!: string;
}
