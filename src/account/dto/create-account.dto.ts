import { AccountRole } from '@src/account/entities/account.entity';
import { UniqueUsernameValidator } from '@src/account/dto/unique-username.validator';
import { Transform } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Length,
	Matches,
	Validate,
} from 'class-validator';
import { UniqueEmailValidator } from '@src/account/dto/unique-email.validator';

export class CreateAccountDto {
	@IsNotEmpty()
	@IsString()
	@Length(5, 50)
	@Matches(/^[a-z][a-z0-9_]*$/, {
		message: `Username should start with a lowercase letter and contain only lowercase letters and digits`,
	})
	@Validate(UniqueUsernameValidator)
	username: string;

	@IsNotEmpty()
	@Transform(({ value }) => value ?? AccountRole.ATHLETE)
	role: AccountRole;

	@IsNotEmpty()
	@Validate(UniqueEmailValidator)
	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	email: string;

	@IsNotEmpty()
	@Length(5, 50)
	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
		message:
			'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	})
	password: string;
}
