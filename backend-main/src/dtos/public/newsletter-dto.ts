import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewsLetterDTO {
  @IsNotEmpty()
  @IsEmail()
  email?: string;
}
