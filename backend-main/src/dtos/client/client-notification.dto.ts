import { IsEnum, IsInt, IsNumberString, IsOptional, IsString, Min } from 'class-validator';
import { NotificationTypeEnum } from '../../types/common-types';
import { Type } from 'class-transformer';

export class ClientNotificationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  limit = 10;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsEnum(NotificationTypeEnum)
  type?: NotificationTypeEnum;
}