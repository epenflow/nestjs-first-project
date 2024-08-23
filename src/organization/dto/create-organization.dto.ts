import { AccountExistValidator } from '@src/organization/dto/account-exist.validator';
import { IsNotEmpty, Length, Validate } from 'class-validator';

export class CreateOrganizationDto {
	@IsNotEmpty()
	@Length(1, 100)
	name: string;

	@IsNotEmpty()
	@Validate(AccountExistValidator)
	accountId: string;
}
