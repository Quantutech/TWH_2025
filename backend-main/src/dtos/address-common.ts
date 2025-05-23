import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class AddressCommonDTO {
  @IsOptional()
  @IsNumberString()
  page = 1;

  @IsOptional()
  @IsNumberString()
  limit = 10;

  @IsOptional()
  @IsString()
  keyword?: string

  countryId?: number
  stateId?: number
}
