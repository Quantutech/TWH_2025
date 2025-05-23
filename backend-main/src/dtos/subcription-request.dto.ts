import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionRequestDTO {
    @IsNotEmpty()
    @IsString()
    priceId!: string;
}
