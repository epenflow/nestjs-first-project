import { AccountExistValidator } from '@src/athlete/dto/account-exist.validator';
import { CountryCodes } from '@src/libs/nationality';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';

export class CreateAthleteDto {
	@IsNotEmpty()
	fullname: string;

	@IsNotEmpty()
	@Validate(AccountExistValidator)
	accountId: string;

	@IsOptional()
	@Transform(({ value }) => value || new Date('1999-01-01'))
	dob: Date;

	@IsOptional()
	@Transform(({ value }) => value || CountryCodes.ID)
	nationality: CountryCodes;
}
