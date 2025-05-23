import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdPathParamDTO {
  @IsNotEmpty()
  @IsNumberString()
  id!: number;
}
