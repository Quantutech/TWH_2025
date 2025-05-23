import {
  isEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../../../api/decorators/match';

export class ClientResetPasswordDTO {
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'Password must be no longer than 50 characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  newPassword!: string;

  @IsString()
  @Match('newPassword', { message: 'Confirm Password must match Password' })
  newPasswordConfirmation!: string;
  
  @IsString()
  token!: string;
}
