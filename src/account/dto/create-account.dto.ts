import { UniqueUsernameValidator } from '@src/account/dto/unique-username.validator';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	Matches,
	Validate,
} from 'class-validator';
import { UniqueEmailValidator } from '@src/account/dto/unique-email.validator';
import { AccountRole } from '@src/libs/account-role';
import { Transform } from 'class-transformer';

export class CreateAccountDto {
	@IsNotEmpty()
	@IsString()
	@Length(5, 50)
	@Matches(/^[a-z][a-z0-9_.]*$/, {
		message: `Username should start with a lowercase letter and contain only lowercase letters and digits`,
	})
	@Validate(UniqueUsernameValidator)
	username: string;

	@IsNotEmpty()
	@Validate(UniqueEmailValidator)
	@IsEmail()
	@Transform(({ value }) => {
		console.log('email', value);
		return value.toLowerCase();
	})
	email: string;

	@IsNotEmpty()
	@Length(5, 50)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
		message:
			'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	password: string;

	@Transform(({ value }) => {
		console.log('Transforming role:', value);
		return value !== AccountRole ? AccountRole.ATHLETE : value;
	})
	@IsOptional()
	role: AccountRole;
}
