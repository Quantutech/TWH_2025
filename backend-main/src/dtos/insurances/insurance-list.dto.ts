import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class InsurancesListDTO {
    @IsOptional()
    @IsNumberString()
    page = 1;

    @IsOptional()
    @IsNumberString()
    limit = 10;

    @IsOptional()
    @IsString()
    keyword?: string
}
