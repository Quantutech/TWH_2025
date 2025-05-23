import {
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum, MaxLength,
} from 'class-validator';
import { WaitingTimeEnum } from '../../types/common-types';

export class GiveEvaluateDto {
  @IsInt({ message: 'Provider ID must be an integer' })
  providerId!: number;

  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating!: number;

  @IsBoolean({ message: 'Suggestion must be true or false' })
  suggestion!: boolean;

  @IsEnum(WaitingTimeEnum, { message: 'Waiting time must be a valid enum value' })
  waitingTime?: WaitingTimeEnum;

  @IsString({ message: 'Comment must be a string' })
  @MaxLength(300, { message: 'Comment must not exceed 300 characters' })
  comment?: string;
}

export class GetEvaluateDto {
  @IsString({ message: 'Provider ID must be a string' })
  @IsNotEmpty({ message: 'Provider ID is required' })
  providerId!: string;
}
