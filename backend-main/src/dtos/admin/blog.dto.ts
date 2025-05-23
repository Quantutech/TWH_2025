import { Type } from "class-transformer";
import { IsNumberString, IsOptional } from "class-validator";

export class GetBlogDto {
	@IsOptional()
	@Type(() => Number)
	@IsNumberString()
	page = 1;

	@IsOptional()
	@Type(() => Number)
	@IsNumberString()
	limit = 10;
}
