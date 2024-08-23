import { PartialType } from '@nestjs/mapped-types';
import { CreateAthleteDto } from './create-athlete.dto';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { CountryCodes } from 'src/libs/nationality';

export class UpdateAthleteDto extends PartialType(CreateAthleteDto) {
	@IsOptional()
	@IsString()
	@Length(1, 255)
	fullname?: string;

	@IsOptional()
	@Type(() => Date)
	dob?: Date;

	@IsOptional()
	@IsEnum(CountryCodes)
	nationality?: CountryCodes;
}
