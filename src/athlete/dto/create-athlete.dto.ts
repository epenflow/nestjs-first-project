import { AccountExistValidator } from '@src/athlete/dto/account-exist.validator';
import { IsNotEmpty, Validate } from 'class-validator';

export class CreateAthleteDto {
	@IsNotEmpty()
	fullname: string;

	@IsNotEmpty()
	@Validate(AccountExistValidator)
	accountId: string;
}
